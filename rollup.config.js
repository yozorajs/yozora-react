import createRollupConfigs from '@guanghechen/rollup-config-tsx'
import fs from 'fs-extra'
import path from 'path'

export async function rollupConfig() {
  const { default: manifest } = await import(path.resolve('package.json'))

  const paths = {
    assetPath: path.resolve('lib'),
    basePath: path.resolve('src'),
    styleFile: path.resolve('src/style/index.styl'),
    tsconfig: path.resolve('tsconfig.src.json'),
  }

  const configs = createRollupConfigs({
    manifest,
    pluginOptions: {
      typescriptOptions: { tsconfig: paths.tsconfig },
      postcssOptions: {
        extract: 'index.css',
        minimize: false,
        sourceMap: false,
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: 'barusu-[local]',
        },
        postcssUrlOptions: {
          url: 'inline',
          maxSize: 0.5, // 0.5 KB
          basePath: paths.basePath,
          fallback: function (asset) {
            const url = asset.url.replace(/^[/]assets[/]/, '../assets/')
            return url
          },
        },
      },
    },
    preprocessOptions: fs.existsSync(paths.styleFile)
      ? {
        input: paths.styleFile,
        pluginOptions: {
          multiEntryOptions: {
            exports: false,
          },
          postcssOptions: {
            modules: {
              localsConvention: 'camelCase',
              generateScopedName: 'barusu-[local]',
            },
            postcssUrlOptions: {
              url: 'inline',
              maxSize: 0.5, // 0.5 KB
              assetsPath: paths.assetPath,
              fallback: 'copy',
              basePath: paths.basePath,
              useHash: false,
            },
          },
        },
      }
      : undefined
  })
  return configs
}

const configs = rollupConfig()
export default configs
