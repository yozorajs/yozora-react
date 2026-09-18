import { builtinModules, createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'tsdown'
import { buildStyles, getStyleWatchFiles } from './script/build-styles.mjs'

const { default: manifest } = await import(path.resolve('package.json'), {
  with: { type: 'json' },
})

const dependencies = new Set([
  ...builtinModules,
  ...builtinModules.map(name => `node:${name}`),
  ...Object.keys(manifest.dependencies ?? {}),
  ...Object.keys(manifest.peerDependencies ?? {}),
  ...Object.keys(manifest.optionalDependencies ?? {}),
])

const neverBundle = id => {
  const name = /^(@[^/]+\/[^/]+|[^/]+)/.exec(id)?.[1]
  return dependencies.has(name)
}

const isReactCore = manifest.name === '@yozora/react-renderer'
const require = createRequire(import.meta.url)

const common = {
  cwd: process.cwd(),
  entry: { index: manifest.source },
  tsconfig: 'tsconfig.lib.json',
  target: 'esnext',
  platform: 'neutral',
  deps: { neverBundle, onlyBundle: [] },
  clean: true,
  exports: false,
}

export default defineConfig([
  ...[
    ['esm', manifest.module],
    ['cjs', manifest.main],
  ].map(([format, file]) => ({
    ...common,
    format,
    outDir: path.dirname(file),
    outExtensions: () => ({ js: path.extname(file) }),
    sourcemap: process.env.BUILD_SOURCEMAP === 'true',
    cjsDefault: false,
    dts: false,
    // Keep unrelated core and code modules removable for standalone consumers.
    unbundle: isReactCore || manifest.name === '@yozora/react-renderer-code',
    ...(format === 'esm'
      ? {
          hooks: { 'build:done': () => buildStyles(process.cwd()) },
          plugins: [
            {
              name: 'yozora-styles',
              buildStart() {
                for (const file of getStyleWatchFiles(process.cwd())) this.addWatchFile(file)
              },
            },
          ],
        }
      : {}),
    outputOptions: {
      exports: 'named',
      comments: process.env.NODE_ENV !== 'production',
    },
  })),
  {
    ...common,
    format: 'esm',
    // Prism's runtime package has no declarations; inline the existing @types package.
    ...(isReactCore ? { alias: { prismjs: require.resolve('@types/prismjs/index.d.ts') } } : {}),
    // Bundle development-only types so consumers do not need devDependencies.
    deps: {
      neverBundle: id => !(isReactCore && id === 'prismjs') && neverBundle(id),
      alwaysBundle: isReactCore ? ['prismjs'] : [],
      onlyBundle: [
        ...Object.keys(manifest.devDependencies ?? {}),
        // Prism does not ship declarations; retain the existing public token types inline.
        ...(isReactCore ? ['@types/prismjs'] : []),
      ],
    },
    outDir: path.dirname(manifest.types),
    outExtensions: () => ({ dts: '.d.ts' }),
    sourcemap: false,
    // Keep non-exported helper types private in declaration files.
    footer: { dts: 'export {};' },
    dts: {
      generator: 'tsgo',
      emitDtsOnly: true,
      sourcemap: false,
      compilerOptions: { declarationMap: false },
    },
  },
])
