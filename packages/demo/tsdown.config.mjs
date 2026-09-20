import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'tsdown'

const root = import.meta.dirname
const require = createRequire(import.meta.url)
const markdownStyles = require.resolve('@yozora/react-yozora/style.css')
const mathjaxManifest = require.resolve('@mathjax/src/package.json')
const mathjaxRoot = path.dirname(mathjaxManifest)
const mathjaxFontRoot = path.dirname(
  createRequire(mathjaxManifest).resolve('@mathjax/mathjax-newcm-font/package.json'),
)
const assets = new Map([
  [path.join(root, 'index.html'), 'index.html'],
  [path.join(root, 'src/demo.css'), 'demo.css'],
  [markdownStyles, 'yozora.css'],
  [require.resolve('@yozora/react-gfm/style.css'), 'gfm.css'],
  [require.resolve('@yozora/react-gfm-ex/style.css'), 'gfm-ex.css'],
  [require.resolve('@yozora/react-renderer-code/style.css'), 'code.css'],
  [path.join(path.dirname(markdownStyles), 'THIRD_PARTY_NOTICES.md'), 'THIRD_PARTY_NOTICES.md'],
  [path.join(mathjaxRoot, 'bundle'), 'mathjax'],
  [path.join(mathjaxRoot, 'LICENSE'), 'mathjax/LICENSE'],
  [path.join(mathjaxFontRoot, 'chtml'), 'mathjax-newcm-font/chtml'],
  [path.join(mathjaxFontRoot, 'package.json'), 'mathjax-newcm-font/package.json'],
])

export default defineConfig({
  cwd: root,
  entry: { main: 'src/main.tsx' },
  tsconfig: 'tsconfig.json',
  platform: 'browser',
  target: ['chrome111', 'safari16.4', 'firefox128'],
  format: 'esm',
  outDir: 'dist',
  outExtensions: () => ({ js: '.js' }),
  deps: { alwaysBundle: () => true, onlyBundle: false },
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development') },
  dts: false,
  exports: false,
  sourcemap: true,
  clean: true,
  plugins: [
    {
      name: 'demo-assets',
      buildStart() {
        for (const file of assets.keys()) this.addWatchFile(file)
      },
    },
  ],
  hooks: {
    async 'build:done'() {
      for (const [source, name] of assets) {
        await fs.cp(source, path.join(root, 'dist', name), { recursive: true })
      }
    },
  },
})
