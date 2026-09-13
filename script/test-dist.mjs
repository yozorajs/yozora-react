import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const root = fileURLToPath(new URL('../', import.meta.url))
const packagesDir = path.join(root, 'packages')

for (const name of fs.readdirSync(packagesDir)) {
  const packageDir = path.join(packagesDir, name)
  const manifestPath = path.join(packageDir, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const esmPath = path.resolve(packageDir, manifest.exports.import)
  const cjsPath = path.resolve(packageDir, manifest.exports.require)
  const typesPath = path.resolve(packageDir, manifest.exports.types)
  assert.equal(esmPath, path.resolve(packageDir, manifest.module))
  assert.equal(cjsPath, path.resolve(packageDir, manifest.main))
  assert.equal(typesPath, path.resolve(packageDir, manifest.types))
  assert.ok(fs.existsSync(typesPath), `${manifest.name}: missing declarations`)
  if (name === 'react-mathjax') {
    assert.doesNotMatch(
      fs.readFileSync(typesPath, 'utf8'),
      /(?:from\s*|import\s*\(\s*)['"]@mathjax\/src/,
      'MathJax declarations must not require a development dependency',
    )
  }

  const esm = await import(pathToFileURL(esmPath).href)
  const cjs = createRequire(manifestPath)(manifest.name)
  const exportedNames = Object.keys(esm).sort()
  assert.deepEqual(
    Object.keys(cjs)
      .filter(key => key !== '__esModule')
      .sort(),
    exportedNames,
    `${manifest.name}: ESM and CJS exports must agree`,
  )
  assert.equal(exportedNames.length === 0, name === 'core-react-types')

  const consumerDir = fs.mkdtempSync(path.join(packageDir, '.tsdown-consumer-'))
  try {
    const imports = exportedNames.map(key => (key === 'default' ? 'default as DefaultExport' : key))
    const exports = exportedNames.map(key => (key === 'default' ? 'DefaultExport' : key))
    let consumer = `import { ${imports.join(', ')} } from '${manifest.name}'\n`
    consumer += `export { ${exports.join(', ')} }\n`
    if (name === 'core-react-types') {
      consumer += `export type { ICodeRunner, ICodeRunnerProps, ICodeRunnerScope } from '${manifest.name}'\n`
    }
    if (name === 'react-code-editor' || name === 'react-code-highlighter') {
      consumer += '// @ts-expect-error Implementation props must remain private.\n'
      consumer += `import type { IProps } from '${manifest.name}'\n`
    }
    fs.writeFileSync(path.join(consumerDir, 'index.mts'), consumer)
    fs.writeFileSync(path.join(consumerDir, 'index.cts'), consumer)
    const configPath = path.join(consumerDir, 'tsconfig.json')
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        compilerOptions: {
          noEmit: true,
          strict: true,
          target: 'esnext',
          module: 'nodenext',
          // Bundled MathJax types already have TS2344 errors in the Rollup output.
          skipLibCheck: name === 'react-mathjax' || name === 'react-markdown',
          types: [],
        },
        include: ['index.mts', 'index.cts'],
      }),
    )
    const result = spawnSync('tsc', ['--project', configPath], {
      cwd: root,
      encoding: 'utf8',
      shell: process.platform === 'win32',
    })
    assert.ifError(result.error)
    assert.equal(result.status, 0, `${manifest.name}: ${result.stdout}${result.stderr}`)
  } finally {
    fs.rmSync(consumerDir, { recursive: true, force: true })
  }

  for (const module of [esm, cjs]) {
    if (name === 'core-react-util') {
      assert.deepEqual(
        module.parseCodeMeta('{1-2,2-3} live collapsed', { showCodeLineno: false }),
        {
          live: true,
          highlights: [1, 2, 3],
          maxlines: -1,
          title: '',
          collapsed: true,
          showlineno: false,
        },
      )
    }
    if (name === 'react-code-highlighter') {
      assert.equal(module.default, module.CodeHighlighter)
      const markup = renderToStaticMarkup(
        React.createElement(module.default, {
          lang: 'typescript',
          value: 'const value: number = 1',
        }),
      )
      assert.match(markup, /token keyword/)
      assert.match(markup, /token number/)
    }
    if (name === 'react-code-editor') {
      assert.equal(module.default, module.CodeEditor)
      const markup = renderToStaticMarkup(
        React.createElement(module.default, {
          lang: 'typescript',
          code: 'const value = 1',
          onChange: () => {},
        }),
      )
      assert.match(markup, /<textarea/)
      assert.match(markup, /token keyword/)
    }
  }
  console.log(`${manifest.name}: ESM, CJS, and public declarations passed`)
}
