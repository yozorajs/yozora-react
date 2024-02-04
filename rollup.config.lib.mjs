import {
  createRollupConfig,
  dtsPresetConfigBuilder,
  tsPresetConfigBuilder,
} from '@guanghechen/rollup-config'
import path from 'node:path'

export default async function rollupConfig() {
  const { default: manifest } = await import(path.resolve('package.json'), {
    assert: { type: 'json' },
  })
  const config = await createRollupConfig({
    manifest,
    env: {
      sourcemap: false,
    },
    presetConfigBuilders: [
      tsPresetConfigBuilder({
        typescriptOptions: {
          tsconfig: 'tsconfig.lib.json',
        },
      }),
      dtsPresetConfigBuilder({
        dtsOptions: {
          respectExternal: true,
          tsconfig: 'tsconfig.lib.json',
        },
      }),
    ],
  })
  return config
}
