import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Rolldown } from 'tsdown'
import { getStylePackages } from './build-styles.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const packagesDir = path.join(root, 'packages')

for (const name of fs.readdirSync(packagesDir)) {
  const packageDir = path.join(packagesDir, name)
  const manifestPath = path.join(packageDir, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (manifest.private) continue
  const rootExports = manifest.exports['.'] ?? manifest.exports
  const esmPath = path.resolve(packageDir, rootExports.import)
  const cjsPath = path.resolve(packageDir, rootExports.require)
  const typesPath = path.resolve(packageDir, rootExports.types)
  assert.equal(esmPath, path.resolve(packageDir, manifest.module))
  assert.equal(cjsPath, path.resolve(packageDir, manifest.main))
  assert.equal(typesPath, path.resolve(packageDir, manifest.types))
  assert.ok(fs.existsSync(typesPath), `${manifest.name}: missing declarations`)
  for (const file of [esmPath, cjsPath, typesPath]) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /@emotion\//)
  }
  const stylePackages = getStylePackages(packageDir)
  if (stylePackages.length > 0) {
    const stylesheetPath = createRequire(manifestPath).resolve(`${manifest.name}/style.css`)
    assert.equal(stylesheetPath, path.join(packageDir, 'lib/style.css'))
    const css = fs.readFileSync(stylesheetPath, 'utf8')
    if (stylePackages.includes(path.join(packagesDir, 'react'))) {
      assert.match(css, /THIRD_PARTY_NOTICES\.md/)
      assert.equal(
        fs.readFileSync(path.join(packageDir, 'lib/THIRD_PARTY_NOTICES.md'), 'utf8'),
        fs.readFileSync(path.join(packagesDir, 'react/THIRD_PARTY_NOTICES.md'), 'utf8'),
        `${manifest.name}: theme palette notices must accompany the stylesheet`,
      )
    }
    assert.ok(css.length > 100, `${manifest.name}: empty stylesheet`)
    assert.doesNotMatch(css, /@(?:apply|source|variant|custom-variant|import)\b/)
    assert.doesNotMatch(css, /@layer\s+(?:components|theme|utilities)\b/)
    assert.ok(!css.includes(':is()'), `${manifest.name}: invalid nested pseudo-element selector`)
    assert.ok(manifest.sideEffects === true || manifest.sideEffects.includes('**/*.css'))
    for (const dir of stylePackages) {
      const sourceDir = path.join(dir, 'src')
      for (const file of fs.readdirSync(sourceDir, { recursive: true, withFileTypes: true })) {
        if (!file.isFile() || !file.name.endsWith('.css')) continue
        const source = fs.readFileSync(path.join(file.parentPath, file.name), 'utf8')
        for (const [, className] of source.matchAll(/\.(yozora-[\w-]+)/g)) {
          assert.ok(css.includes(className), `${manifest.name}: missing .${className}`)
        }
      }
    }
    if (name === 'react-markdown') {
      /** Verify published declarations and consumer overrides; media/cascade behavior needs a browser. */
      const reset = '* { border-width: 0; border-style: solid; } p { margin: 0; }'
      const host = new JSDOM(`<style>${reset}\n${css}</style>
          <div class="yozora-admonition__container">Note</div>
          <p class="yozora-paragraph__root">Paragraph</p>
          <div class="yozora-admonition__container yz:ml-[8px]" id="utility">Utility</div>
          <div class="yozora-admonition__container custom">Override</div>
          <style>.custom { border-left-width: 9px; }</style>`)
      try {
        const style = selector =>
          host.window.getComputedStyle(host.window.document.querySelector(selector))
        assert.equal(style('.yozora-admonition__container').borderLeftWidth, '5px')
        assert.equal(style('.yozora-paragraph__root').marginBottom, '16px')
        assert.equal(style('#utility').marginLeft, '8px')
        assert.equal(style('.custom').borderLeftWidth, '9px')
      } finally {
        host.window.close()
      }
      // MathJax 4 injects these unlayered rules after the application stylesheet.
      const dom = new JSDOM(`
        <style>${css}</style>
        <style>
          mjx-container[display] { display: block; margin: .7em 0; }
          mjx-container [width="full"] { width: 100%; }
        </style>
        <div class="yozora-markdown">
          <div class="yozora-math"><mjx-container display="true">x</mjx-container></div>
          <span class="yozora-inline-math">
            <mjx-container><mjx-itable width="full">x</mjx-itable></mjx-container>
          </span>
        </div>
      `)
      try {
        const block = dom.window.document.querySelector('mjx-container[display]')
        const inline = dom.window.document.querySelector('mjx-itable')
        assert.equal(dom.window.getComputedStyle(block).marginTop, '0px')
        assert.equal(dom.window.getComputedStyle(block).marginBottom, '0px')
        assert.equal(dom.window.getComputedStyle(inline).width, 'auto')
      } finally {
        dom.window.close()
      }
    }
  }
  if (name === 'react') {
    assert.doesNotMatch(
      fs.readFileSync(typesPath, 'utf8'),
      /(?:from\s*|import\s*\(\s*)['"]prismjs/,
      'Core declarations must not require consumers to install Prism types',
    )
  }
  if (name === 'react-embed-math') {
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
  assert.ok(exportedNames.length > 0, `${manifest.name}: missing runtime exports`)

  const consumerDir = fs.mkdtempSync(path.join(packageDir, '.tsdown-consumer-'))
  try {
    const imports = exportedNames.map(key => (key === 'default' ? 'default as DefaultExport' : key))
    const exports = exportedNames.map(key => (key === 'default' ? 'DefaultExport' : key))
    let consumer = `import { ${imports.join(', ')} } from '${manifest.name}'\n`
    consumer += `export { ${exports.join(', ')} }\n`
    if (stylePackages.length > 0) {
      consumer += `import '${manifest.name}/style.css'\n`
      consumer += '// @ts-expect-error Unknown CSS subpaths must remain unresolved.\n'
      consumer += `import '${manifest.name}/missing.css'\n`
    }
    if (name === 'react') {
      consumer += `export type { ClassValue, IClassDictionary, IParseCodeMetaOptions, ICodeMetaData, ICodeRunnerMetaData, ICodeRunner, ICodeRunnerProps, ICodeRunnerScope, ICodeRunnerItem, IAsyncRunnerScopes } from '${manifest.name}'\n`
      consumer += `import type { IBreakpoints, IThemeContext, IThemeProviderProps } from '${manifest.name}'\n`
      consumer +=
        'export const customTheme: IThemeProviderProps = { breakpoints: {} as IBreakpoints, nonce: "request-nonce" }\n'
      consumer += 'export type ContextBreakpoints = IThemeContext["breakpoints"]\n'
      consumer += 'export type ContextNonce = IThemeContext["nonce"]\n'
      consumer += 'export type ContextVariant = IThemeContext["variant"]\n'
      consumer += `export type { IThemeSchema, IThemePalette, IThemeSyntax, IPrismTheme, IToken, IThemeDict } from '${manifest.name}'\n`
      consumer +=
        'export const modernTheme: IThemeProviderProps = { theme: "vsc", variant: "dark-modern" }\n'
    }
    if (name === 'react') {
      consumer += `import type { INodeStyleMap, INodeRendererMap, INodeRendererProviderProps, INodeRendererState, IImageViewerProps } from '${manifest.name}'\n`
      consumer +=
        'export type RendererContracts = [INodeRendererMap, INodeRendererProviderProps, INodeRendererState, IImageViewerProps]\n'
      consumer +=
        'export const nodeStyles: INodeStyleMap = { paragraph: { color: "red", nested: { "&:hover": { color: "blue" } }, fallbacks: [null, false, { display: "flex" }] } }\n'
      /** Keep representative legacy input types without restoring a styling-engine dependency. */
      consumer += `
interface ILegacyComponentSelector { __emotion_styles: unknown }
type LegacySerializedStyles = {
  name: string
  styles: string
  next?: LegacySerializedStyles
}
type LegacyKeyframes = { name: string; styles: string; anim: number; toString: () => string } & string
type LegacyInterpolation =
  | string | number | boolean | null | undefined
  | ILegacyComponentSelector | LegacySerializedStyles | LegacyKeyframes
  | ILegacyCSSObject | readonly LegacyInterpolation[]
interface ILegacyCSSObject {
  color?: string | readonly string[]
  display?: string | readonly string[]
  [property: string]: LegacyInterpolation
}
declare const selector: ILegacyComponentSelector
declare const serialized: LegacySerializedStyles
declare const keyframes: LegacyKeyframes
declare const interpolation: LegacyInterpolation
const cssObject: ILegacyCSSObject = {
  color: "red",
  display: ["-webkit-box", "flex"],
  "&:hover": { color: "blue" },
  nested: [selector, serialized, keyframes],
}
export const legacyStyles: INodeStyleMap = {
  paragraph: { cssObject, selector, serialized, keyframes, interpolation, fallbacks: [null, false, cssObject] },
}
export const legacyReadback: LegacyInterpolation = legacyStyles.paragraph.cssObject
declare function serializeLegacy(...styles: readonly LegacyInterpolation[]): string
export const legacyClassName = serializeLegacy(legacyStyles.paragraph.cssObject, legacyStyles.paragraph.fallbacks)
// @ts-expect-error Ordinary functions are not legacy CSS interpolations.
export const invalidFunction: INodeStyleMap = { paragraph: { body: () => "red" } }
// @ts-expect-error Nested functions are not legacy CSS interpolations either.
export const invalidNestedFunction: INodeStyleMap = { paragraph: { body: { color: () => "red" } } }
// @ts-expect-error Arrays must contain supported interpolation values.
export const invalidArray: INodeStyleMap = { paragraph: { body: [Symbol("red")] } }
`
    }
    if (name === 'react-renderer-code') {
      consumer += `export type { IEditorTextareaProps, IEditorPreProps, IEditorProps, IEditorState, IEditorOperationRecord, IEditorHistory, ICodeLiveProps, ICodeLiveState } from '${manifest.name}'\n`
      consumer += `export type { ICreateUseJsxRunnerParams, IDynamicImportRule, IDynamicImportFunc } from '${manifest.name}'\n`
      consumer += `export const componentClasses: string[] = [classes.editor.container, classes.embed.error, classes.literal.content, classes.live.main]\n`
      consumer += `import type { ComponentProps } from 'react'\n`
      consumer += `export const editorProps: ComponentProps<typeof CodeEditor> = { lang: 'typescript', code: 'const value = 1', onChange: () => {}, showLineNo: true }\n`
      consumer += `export const embedProps: ComponentProps<typeof CodeEmbed> = { lang: 'text', value: 'hello', runner: () => null }\n`
      consumer += `export const literalProps: ComponentProps<typeof CodeLiteral> = { lang: 'typescript', value: 'const value = 1', highlightLinenos: [1] }\n`
      consumer += `export const liveProps: ComponentProps<typeof CodeLive> = { lang: 'jsx', value: 'function Demo() { return null }', runners: defaultRunners }\n`
      consumer += `export type { ICopyStatusTipMap } from '${manifest.name}'\n`
      consumer += `export const copyProps: ComponentProps<typeof CopyButton> = { value: 'hello', statusTipMap: { completed: 'Copied' }, onError: () => {} }\n`
      consumer += `export const lightProps: ComponentProps<typeof LightButtons> = { onClose: () => {}, onMinimize: () => {}, onMaximize: () => {} }\n`
    }
    if (name === 'react-renderer-code' || name === 'react') {
      consumer += '// @ts-expect-error Implementation props must remain private.\n'
      consumer += `import type { IProps } from '${manifest.name}'\n`
    }
    fs.writeFileSync(path.join(consumerDir, 'index.mts'), consumer)
    fs.writeFileSync(path.join(consumerDir, 'index.cts'), consumer)
    if (name === 'react-renderer-code') {
      const editorEntry = path.join(consumerDir, 'editor.mjs')
      fs.writeFileSync(editorEntry, `export { CodeEditor } from '${manifest.name}'\n`)
      const bundle = await Rolldown.rolldown({
        input: editorEntry,
        external: [
          ...Object.keys(manifest.dependencies),
          ...Object.keys(manifest.peerDependencies),
        ],
      })
      try {
        const { output } = await bundle.generate({ format: 'esm' })
        assert.deepEqual(
          output[0].imports.slice().sort(),
          ['@guanghechen/equal', '@yozora/react', 'react'],
          'Standalone editors must not load JSX runners, live previews, or toolbar dependencies',
        )
      } finally {
        await bundle.close()
      }
      const codeEntry = path.join(consumerDir, 'code.mjs')
      fs.writeFileSync(codeEntry, `export { Code } from '${manifest.name}'\n`)
      const codeBundle = await Rolldown.rolldown({
        input: codeEntry,
        external: [
          ...Object.keys(manifest.dependencies),
          ...Object.keys(manifest.peerDependencies),
        ],
      })
      try {
        const { output } = await codeBundle.generate({ format: 'esm' })
        assert.ok(!output[0].imports.includes('@yozora/react-embed-jsx'))
        assert.ok(output[0].dynamicImports.includes('@yozora/react-embed-jsx'))
      } finally {
        await codeBundle.close()
      }
      const coldProbe = path.join(consumerDir, 'cold-code.mjs')
      fs.writeFileSync(
        coldProbe,
        `
import assert from 'node:assert/strict'
import { createRequire, registerHooks } from 'node:module'
import React from 'react'
import { renderToString } from 'react-dom/server'
registerHooks({ resolve(specifier, context, next) {
  assert.notEqual(specifier, '@yozora/react-embed-jsx', 'SSR must not load the JSX renderer')
  return next(specifier, context)
} })
const esm = await import(${JSON.stringify(pathToFileURL(esmPath).href)})
const cjs = createRequire(import.meta.url)(${JSON.stringify(manifest.name)})
for (const module of [esm, cjs]) {
  const literal = renderToString(React.createElement(module.Code, { lang: 'typescript', value: 'const value = 1' }))
  assert.match(literal, /token keyword/)
  const live = renderToString(React.createElement(module.Code, { lang: 'jsx', value: 'function Demo() { return null }', meta: 'live' }))
  assert.match(live, /<textarea/)
  assert.match(live, /yozora-code-live__previewer/)
}
`,
      )
      const coldResult = spawnSync(process.execPath, [coldProbe], { encoding: 'utf8' })
      assert.equal(coldResult.status, 0, coldResult.stderr || coldResult.stdout)
    }
    if (name === 'react') {
      const utilityEntry = path.join(consumerDir, 'utility.mjs')
      fs.writeFileSync(utilityEntry, `export { clsx } from '${manifest.name}'\n`)
      const bundle = await Rolldown.rolldown({
        input: utilityEntry,
        external: [
          'react',
          'react-dom',
          'prismjs',
          '@guanghechen/equal',
          '@guanghechen/react-viewmodel',
          '@yozora/ast',
        ],
      })
      try {
        const { output } = await bundle.generate({ format: 'esm' })
        assert.deepEqual(
          output[0].imports,
          [],
          'Utility consumers must not load React, renderer, or highlighter dependencies',
        )
        const utilities = await import(
          'data:text/javascript;base64,' + Buffer.from(output[0].code).toString('base64')
        )
        assert.equal(utilities.clsx('button', [null, 'rounded']), 'button rounded')
      } finally {
        await bundle.close()
      }
      const highlighterEntry = path.join(consumerDir, 'highlighter.mjs')
      fs.writeFileSync(highlighterEntry, `export { CodeHighlighter } from '${manifest.name}'\n`)
      const highlighterBundle = await Rolldown.rolldown({
        input: highlighterEntry,
        external: [
          'react',
          'react-dom',
          'prismjs',
          '@guanghechen/equal',
          '@guanghechen/react-viewmodel',
          '@yozora/ast',
        ],
      })
      try {
        const file = path.join(consumerDir, 'highlighter-bundle.mjs')
        const { output } = await highlighterBundle.write({ file, format: 'esm' })
        for (const dependency of ['react-dom', '@guanghechen/react-viewmodel', '@yozora/ast']) {
          assert.ok(
            !output[0].imports.includes(dependency),
            `Highlighters must not load ${dependency}`,
          )
        }
        const probe = path.join(consumerDir, 'highlighter-probe.mjs')
        fs.writeFileSync(
          probe,
          `
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CodeHighlighter } from './highlighter-bundle.mjs'
for (const [lang, value] of [
  ['typescript', 'const count: number = 1'],
  ['python', 'def greet(): return "hello"'],
  ['sql', 'SELECT name FROM users'],
]) {
  const markup = renderToStaticMarkup(React.createElement(CodeHighlighter, { lang, value }))
  assert.match(markup, /token keyword/, lang + ': bundled highlighters must retain grammars')
}
`,
        )
        // A fresh process cannot reuse grammars registered by the earlier package imports.
        const result = spawnSync(process.execPath, [probe], { cwd: root, encoding: 'utf8' })
        assert.ifError(result.error)
        assert.equal(result.status, 0, `${result.stdout}${result.stderr}`)
      } finally {
        await highlighterBundle.close()
      }
      const rendererEntry = path.join(consumerDir, 'renderer.mjs')
      fs.writeFileSync(
        rendererEntry,
        `export { NodeRendererProvider, NodesRenderer, ThemeProvider } from '${manifest.name}'\n`,
      )
      const rendererBundle = await Rolldown.rolldown({
        input: rendererEntry,
        external: [
          'react',
          'react-dom',
          'prismjs',
          '@guanghechen/equal',
          '@guanghechen/react-viewmodel',
          '@yozora/ast',
        ],
      })
      try {
        await rendererBundle.write({
          file: path.join(consumerDir, 'renderer-bundle.mjs'),
          format: 'esm',
        })
        const probe = path.join(consumerDir, 'renderer-probe.mjs')
        fs.writeFileSync(
          probe,
          `
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NodeRendererProvider, NodesRenderer, ThemeProvider } from './renderer-bundle.mjs'
const nodes = [
  { type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: 'Nested renderer' }] }] },
  { type: 'code', lang: 'typescript', meta: '', value: 'const value = 1' },
]
const html = renderToStaticMarkup(React.createElement(ThemeProvider, { theme: 'catppuccin', variant: 'mocha' },
  React.createElement(NodeRendererProvider, null, React.createElement(NodesRenderer, { nodes }))))
assert.match(html, /<strong[^>]*>Nested renderer/)
assert.match(html, /token keyword[^>]*color:#cba6f7/i)
`,
        )
        const result = spawnSync(process.execPath, [probe], { cwd: root, encoding: 'utf8' })
        assert.ifError(result.error)
        assert.equal(result.status, 0, `${result.stdout}${result.stderr}`)
      } finally {
        await rendererBundle.close()
      }
    }
    const configPath = path.join(consumerDir, 'tsconfig.json')
    for (const moduleResolution of ['nodenext', 'bundler']) {
      fs.writeFileSync(
        configPath,
        JSON.stringify({
          compilerOptions: {
            noEmit: true,
            strict: true,
            target: 'esnext',
            module: moduleResolution === 'nodenext' ? 'nodenext' : 'preserve',
            moduleResolution,
            noUncheckedSideEffectImports: true,
            // Bundled MathJax types already have TS2344 errors in the Rollup output.
            skipLibCheck: name === 'react-embed-math' || name === 'react-markdown',
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
      assert.equal(
        result.status,
        0,
        `${manifest.name} (${moduleResolution}): ${result.stdout}${result.stderr}`,
      )
    }
  } finally {
    fs.rmSync(consumerDir, { recursive: true, force: true })
  }

  for (const module of [esm, cjs]) {
    if (name === 'react-markdown') {
      const themeDir = path.join(packagesDir, 'react')
      const theme =
        module === esm
          ? await import(pathToFileURL(path.join(themeDir, 'lib/esm/index.mjs')).href)
          : createRequire(path.join(themeDir, 'package.json'))('@yozora/react')
      function CustomRoot({ className, style, itemProp, children }) {
        return React.createElement('section', { className, style, itemProp }, children)
      }
      function NonceFixture({ Element, query }) {
        const { breakpoints } = theme.useThemeContext()
        return React.createElement(
          theme.ThemeProvider,
          { nonce: 'request-nonce' },
          React.createElement(
            theme.ThemeProvider,
            {
              breakpoints: { ...breakpoints, xsMinus: query },
            },
            React.createElement(module.MarkdownRoot, { Element }, 'Content'),
          ),
        )
      }
      const css = fs.readFileSync(path.join(packageDir, 'lib/style.css'), 'utf8')
      for (const Element of ['section', CustomRoot]) {
        for (const query of ['(max-width: 800px)', '(max-width: 200px)', '(max-width: 479px)']) {
          const html = renderToStaticMarkup(React.createElement(NonceFixture, { Element, query }))
          const dom = new JSDOM(`<style>${css}</style>${html}`)
          try {
            const isDefault = query === '(max-width: 479px)'
            const root = dom.window.document.querySelector('.yozora-markdown')
            const styles = [...dom.window.document.querySelectorAll('style[media]')]
            assert.equal(styles.length, isDefault ? 0 : 2)
            for (const style of styles) {
              assert.equal(style.nonce, 'request-nonce')
              assert.doesNotMatch(style.textContent, /&(?:quot|lt|gt);/)
              assert.ok(
                style.sheet.cssRules.length > 0,
                'SSR CSS must parse without entity escaping',
              )
            }
            if (!isDefault) {
              const rule = root.querySelector('style[media]').sheet.cssRules[0]
              assert.ok(
                root.matches(rule.selectorText),
                'Custom media CSS must match custom elements',
              )
              assert.equal(rule.style.getPropertyValue('--yozora_fontSizeCode'), '12px')
            }
            const defaultRules = [...dom.window.document.styleSheets[0].cssRules]
              .flatMap(rule => [...(rule.cssRules ?? [])])
              .filter(rule => rule.style?.getPropertyValue('--yozora_fontSizeCode') === '12px')
            assert.ok(defaultRules.length > 0, 'The stylesheet must include the default breakpoint')
            for (const rule of defaultRules) {
              assert.equal(
                root.matches(rule.selectorText),
                isDefault,
                'Default media CSS must exclude custom breakpoints even when attributes are not forwarded',
              )
            }
          } finally {
            dom.window.close()
          }
        }
      }
    }
    if (name === 'react') {
      assert.deepEqual(
        Object.keys(module)
          .filter(key => key !== '__esModule')
          .sort(),
        [
          'BlockquoteRenderer',
          'CodeHighlighter',
          'CodeRenderer',
          'CommonTokenNames',
          'DeleteRenderer',
          'EmphasisRenderer',
          'HeadingRenderer',
          'HighlightContent',
          'HighlightLinenos',
          'ImagePreviewer',
          'ImageReferenceRenderer',
          'ImageRenderer',
          'InlineCodeRenderer',
          'LinkReferenceRenderer',
          'LinkRenderer',
          'ListItemRenderer',
          'ListRenderer',
          'NodeRendererActionsType',
          'NodeRendererContextType',
          'NodeRendererController',
          'NodeRendererProvider',
          'NodeRendererViewModel',
          'NodesRenderer',
          'ParagraphRenderer',
          'StrongRenderer',
          'TableRenderer',
          'TextRenderer',
          'ThematicBreakRenderer',
          'ThemeProvider',
          'TokenNames',
          'areSameArray',
          'buildNodeRendererMap',
          'catppuccinFrappeSchema',
          'catppuccinLatteSchema',
          'catppuccinMacchiatoSchema',
          'catppuccinMochaSchema',
          'classes',
          'clsx',
          'convertToBoolean',
          'defaultNodeRendererMap',
          'getBreakpointId',
          'getThemeSchema',
          'githubTheme',
          'gruvboxDarkSchema',
          'gruvboxLightSchema',
          'kanagawaDragonSchema',
          'kanagawaLotusSchema',
          'kanagawaWaveSchema',
          'normalizeTokens',
          'parseCodeMeta',
          'rosepineDawnSchema',
          'rosepineMainSchema',
          'rosepineMoonSchema',
          'themeSchemas',
          'themeToDict',
          'tokens',
          'tokyonightDaySchema',
          'tokyonightMoonSchema',
          'tokyonightNightSchema',
          'tokyonightStormSchema',
          'useNodeRendererContext',
          'useNodeRendererDispatch',
          'useNodeRendererState',
          'useThemeContext',
          'vars',
          'vscDarkModernSchema',
          'vscDarkTheme',
          'vscLightModernSchema',
          'vscLightTheme',
        ],
      )
      const css = fs.readFileSync(path.join(packageDir, 'lib/style.css'), 'utf8')
      const html = module.themeSchemas
        .map(schema =>
          renderToStaticMarkup(
            React.createElement(
              module.ThemeProvider,
              { theme: schema.theme, variant: schema.variant },
              'Theme',
            ),
          ),
        )
        .join('')
      const dom = new JSDOM(`<style>${css}</style>${html}`)
      try {
        const roots = [...dom.window.document.querySelectorAll('.yozora-theme-root')]
        const rules = [...dom.window.document.styleSheets[0].cssRules]
        assert.equal(roots.length, module.themeSchemas.length)
        for (const [index, root] of roots.entries()) {
          const schema = module.themeSchemas[index]
          const matches = rules.filter(
            rule =>
              rule.selectorText &&
              root.matches(rule.selectorText) &&
              rule.style.getPropertyValue('--yozora_colorBody'),
          )
          assert.equal(
            matches.length,
            1,
            `${schema.theme}/${schema.variant}: exactly one built-in palette must match`,
          )
          const swatch = dom.window.document.createElement('span')
          swatch.style.color = schema.colors[module.TokenNames.colorBody]
          const expected = swatch.style.color
          swatch.style.color = matches[0].style.getPropertyValue('--yozora_colorBody')
          assert.equal(swatch.style.color, expected)
        }
        for (const theme of ['catppuccin', 'vsc']) {
          const custom = dom.window.document.createElement('div')
          custom.className = 'yozora-theme-root'
          custom.dataset.yozoraTheme = theme
          custom.dataset.yozoraVariant = 'bespoke'
          assert.ok(
            !rules.some(
              rule =>
                rule.selectorText &&
                custom.matches(rule.selectorText) &&
                rule.style.getPropertyValue('--yozora_colorBody'),
            ),
            'Unknown variants must leave palette selection to custom CSS',
          )
        }
      } finally {
        dom.window.close()
      }
      assert.equal(module.CommonTokenNames.fontFamilyCode, '--yozora_fontFamilyCode')
      assert.equal(module.TokenNames.colorLink, '--yozora_colorLink')
      assert.equal(module.tokens.colorLink, 'var(--yozora_colorLink)')
      assert.equal(
        module.clsx('button', [null, 'rounded'], { active: true, disabled: false }),
        'button rounded active',
      )
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
    if (name === 'react') {
      const markup = renderToStaticMarkup(
        React.createElement(module.CodeHighlighter, {
          lang: 'typescript',
          value: 'const value: number = 1',
        }),
      )
      assert.match(markup, /token keyword/)
      assert.match(markup, /token number/)
    }
    if (name === 'react-renderer-code') {
      assert.equal(module.default, module.Code)
      const copyMarkup = renderToStaticMarkup(
        React.createElement(module.CopyButton, { value: 'hello' }),
      )
      assert.match(copyMarkup, /data-copy-status="pending"/)
      assert.match(copyMarkup, /aria-label="Copy to clipboard"/)
      const lightMarkup = renderToStaticMarkup(React.createElement(module.LightButtons))
      for (const title of ['close', 'minimize', 'maximize']) {
        assert.ok(lightMarkup.includes(`title="${title}"`))
      }
      assert.equal(await module.copyToClipboard('server rendering'), false)
      const markup = renderToStaticMarkup(
        React.createElement(module.CodeEditor, {
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
