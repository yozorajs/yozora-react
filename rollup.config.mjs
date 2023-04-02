import createRollupConfig from '@guanghechen/rollup-config'
import path from 'node:path'

export default async function rollupConfig() {
  const { default: manifest } = await import(path.resolve('package.json'), {
    assert: { type: 'json' },
  })

  const configs = await createRollupConfig({
    manifest,
    pluginOptions: {
      typescriptOptions: {
        tsconfig: 'tsconfig.src.json',
      },
    },
  })
  return configs
}
