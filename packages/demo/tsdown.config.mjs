import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'tsdown'

const root = import.meta.dirname
const require = createRequire(import.meta.url)
const markdownStyles = require.resolve('@yozora/react-markdown/style.css')
const assets = new Map([
  [path.join(root, 'index.html'), 'index.html'],
  [path.join(root, 'src/demo.css'), 'demo.css'],
  [markdownStyles, 'yozora.css'],
  [path.join(path.dirname(markdownStyles), 'THIRD_PARTY_NOTICES.md'), 'THIRD_PARTY_NOTICES.md'],
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
      await Promise.all(
        [...assets].map(([source, name]) => fs.copyFile(source, path.join(root, 'dist', name))),
      )
    },
  },
})
