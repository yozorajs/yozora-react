import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { builtinModules } from 'node:module'
import path from 'node:path'
import { dts } from 'rollup-plugin-dts'

const shouldSourcemap = process.env.ROLLUP_SHOULD_SOURCEMAP === 'true'
const removeComments = process.env.NODE_ENV === 'production'

const { default: manifest } = await import(path.resolve('package.json'), {
  with: { type: 'json' },
})

const deps = new Set([
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
  ...Object.keys(manifest.dependencies ?? {}),
  ...Object.keys(manifest.peerDependencies ?? {}),
  ...Object.keys(manifest.optionalDependencies ?? {}),
])
const external = id => {
  if (id.startsWith('.') || path.isAbsolute(id)) return false
  const match = /^(@[^/]+\/[^/]+|[^/]+)/.exec(id)
  return match ? deps.has(match[1]) : false
}

function resolveBuildEntries() {
  const exportsField = manifest.exports
  if (
    exportsField &&
    typeof exportsField === 'object' &&
    !('source' in exportsField) &&
    !('import' in exportsField) &&
    !('require' in exportsField) &&
    !('types' in exportsField)
  ) {
    const entries = []
    for (const [subpath, entry] of Object.entries(exportsField)) {
      if (entry === null || typeof entry !== 'object') {
        continue
      }
      entries.push({
        subpath,
        input: entry.source,
        esm: entry.import,
        cjs: entry.require,
        types: entry.types,
      })
    }
    return entries
  }

  const entry = exportsField?.['.'] ?? exportsField ?? {}
  return [
    {
      subpath: '.',
      input: entry.source ?? manifest.source ?? './src/index.ts',
      esm: entry.import ?? manifest.module,
      cjs: entry.require ?? manifest.main,
      types: entry.types ?? manifest.types,
    },
  ]
}

function createTsPlugins() {
  return [
    nodeResolve({ preferBuiltins: true, extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }),
    json(),
    typescript({
      tsconfig: 'tsconfig.lib.json',
      compilerOptions: {
        declaration: false,
        declarationMap: false,
        sourceMap: shouldSourcemap,
        removeComments,
      },
    }),
    commonjs(),
  ]
}

const configs = []

for (const entry of resolveBuildEntries()) {
  const input =
    entry.input ?? (entry.subpath === '.' ? (manifest.source ?? './src/index.ts') : undefined)
  if (!input) {
    continue
  }

  if (entry.esm || entry.cjs) {
    const output = []
    if (entry.esm) {
      output.push({ file: entry.esm, format: 'esm', exports: 'named', sourcemap: shouldSourcemap })
    }
    if (entry.cjs) {
      output.push({ file: entry.cjs, format: 'cjs', exports: 'named', sourcemap: shouldSourcemap })
    }
    configs.push({ input, output, external, plugins: createTsPlugins() })
  }

  if (entry.types) {
    configs.push({
      input,
      output: { file: entry.types, format: 'esm' },
      external,
      plugins: [dts({ tsconfig: 'tsconfig.lib.json', respectExternal: true })],
    })
  }
}

export default configs
