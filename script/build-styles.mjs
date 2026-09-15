import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Rolldown } from 'tsdown'

const root = fileURLToPath(new URL('../', import.meta.url))
const coreDir = path.join(root, 'packages/react-core')
const themeNotices = path.join(coreDir, 'THIRD_PARTY_NOTICES.md')
const require = createRequire(import.meta.url)
const cliManifestPath = require.resolve('@tailwindcss/cli/package.json')
const cliManifest = JSON.parse(fs.readFileSync(cliManifestPath, 'utf8'))
const cli = path.resolve(path.dirname(cliManifestPath), cliManifest.bin.tailwindcss)

/** Collect dependency styles before their consumers so component overrides win. */
export function getStylePackages(packageDir) {
  /** Utility packages can depend on react-core without publishing a stylesheet. */
  if (!fs.existsSync(path.join(packageDir, 'src/style.css'))) return []
  const result = []
  const visited = new Set()
  function visit(dir) {
    if (visited.has(dir)) return
    visited.add(dir)
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    for (const name of Object.keys(manifest.dependencies ?? {})) {
      if (!name.startsWith('@yozora/')) continue
      const dependencyDir = path.join(root, 'packages', name.slice('@yozora/'.length))
      if (fs.existsSync(path.join(dependencyDir, 'package.json'))) visit(dependencyDir)
    }
    if (fs.existsSync(path.join(dir, 'src/style.css'))) result.push(dir)
  }
  visit(packageDir)
  return result
}

export function getStyleWatchFiles(packageDir) {
  return [
    path.join(root, 'styles/tailwind.css'),
    ...getStylePackages(packageDir).flatMap(dir => {
      const sourceDir = path.join(dir, 'src')
      const files = fs.readdirSync(sourceDir, { recursive: true, withFileTypes: true })
      return [
        sourceDir,
        ...(dir === coreDir ? [themeNotices] : []),
        ...files
          .filter(file => file.isDirectory() || /\.(?:css|tsx?)$/.test(file.name))
          .map(file => path.join(file.parentPath, file.name)),
      ]
    }),
  ]
}

export async function buildStyles(packageDir) {
  const packages = getStylePackages(packageDir)
  if (packages.length === 0) return

  const outputDir = path.join(packageDir, 'lib')
  fs.mkdirSync(outputDir, { recursive: true })
  const entryDir = fs.mkdtempSync(path.join(outputDir, '.tailwind-'))
  const relative = file => './' + path.relative(entryDir, file).split(path.sep).join('/')
  try {
    const lines = [`@import ${JSON.stringify(relative(path.join(root, 'styles/tailwind.css')))};`]
    for (const dir of packages) {
      lines.push(`@import ${JSON.stringify(relative(path.join(dir, 'src/style.css')))};`)
    }
    for (const dir of packages) {
      lines.push(`@source ${JSON.stringify(relative(path.join(dir, 'src')))};`)
    }

    const themeDir = path.join(coreDir, 'src/theme')
    if (packages.includes(coreDir)) {
      lines.push('/*! Theme palettes: licenses and attribution in THIRD_PARTY_NOTICES.md. */')
      /** Bundle source schemas so clean builds and watch rebuilds never depend on existing lib files. */
      const schemaEntry = path.join(entryDir, 'schemas.ts')
      fs.writeFileSync(
        schemaEntry,
        `export { commonSchema } from ${JSON.stringify(relative(path.join(themeDir, 'common.ts')))};\n` +
          `export { themeSchemas } from ${JSON.stringify(relative(path.join(themeDir, 'registry.ts')))};`,
      )
      const bundle = await Rolldown.rolldown({ input: schemaEntry, platform: 'node' })
      let schemas
      let commonSchema
      try {
        const { output } = await bundle.generate({ format: 'esm' })
        const module = await import(
          'data:text/javascript;base64,' + Buffer.from(output[0].code).toString('base64')
        )
        schemas = module.themeSchemas
        commonSchema = module.commonSchema
      } finally {
        await bundle.close()
      }
      lines.push('.yozora-theme-root {')
      for (const [token, value] of Object.entries(commonSchema)) lines.push(`${token}: ${value};`)
      lines.push('}')
      for (const schema of schemas) {
        const variant = `[data-yozora-variant="${schema.variant}"]`
        lines.push(`.yozora-theme-root[data-yozora-theme="${schema.theme}"]${variant} {`)
        for (const [token, value] of Object.entries(schema.colors))
          lines.push(`${token}: ${value};`)
        lines.push(`color-scheme: ${schema.darken ? 'dark' : 'light'};`)
        lines.push('background: var(--yozora_colorBgBody); color: var(--yozora_colorBody);')
        lines.push('}')
      }
    }

    const breakpointFile = path.join(themeDir, 'breakpoint.ts')
    const breakpointUrl = pathToFileURL(breakpointFile)
    breakpointUrl.searchParams.set('mtime', String(fs.statSync(breakpointFile).mtimeMs))
    const { defaultSmallScreenQuery } = await import(breakpointUrl.href)
    for (const dir of packages) {
      const file = path.join(
        dir,
        dir === coreDir ? 'src/theme/small-screen.ts' : 'src/small-screen.ts',
      )
      if (!fs.existsSync(file)) continue
      const url = pathToFileURL(file)
      url.searchParams.set('mtime', String(fs.statSync(file).mtimeMs))
      const { getSmallScreenStyles } = await import(url.href)
      lines.push(`@media screen and ${defaultSmallScreenQuery} {`)
      lines.push(getSmallScreenStyles())
      lines.push('}')
    }
    /** Utilities follow component rules so equally specific class overrides still work. */
    lines.push('@tailwind utilities source(none);')

    const entry = path.join(entryDir, 'input.css')
    fs.writeFileSync(entry, lines.join('\n'))
    await new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [cli, '--input', entry, '--output', path.join(outputDir, 'style.css'), '--minify'],
        { cwd: root, stdio: 'inherit' },
      )
      child.once('error', reject)
      child.once('exit', (code, signal) => {
        if (code === 0) resolve()
        else reject(new Error(`Tailwind failed for ${packageDir}: ${signal ?? code}`))
      })
    })
    /** Declare the CSS side-effect entry without adding ambient declarations for unrelated CSS. */
    fs.writeFileSync(path.join(outputDir, 'style.d.ts'), 'export {};\n')
    if (packages.includes(coreDir)) {
      fs.copyFileSync(themeNotices, path.join(outputDir, 'THIRD_PARTY_NOTICES.md'))
    }
  } finally {
    fs.rmSync(entryDir, { recursive: true, force: true })
  }
}
