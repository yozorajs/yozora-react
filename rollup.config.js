import createRollupConfigs from '@guanghechen/rollup-config-tsx'
import fs from 'fs-extra'
import path from 'path'

const stylusOptions = {
  imports: [path.join(__dirname, 'script/stylus/index.styl')],
}

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
      commonjsOptions: {
        sourceMap: false,
      },
      typescriptOptions: {
        tsconfig: 'tsconfig.src.json',
      },
      postcssOptions: {
        extract: 'index.css',
        minimize: false,
        sourceMap: false,
        use: {
          stylus: { ...stylusOptions },
        },
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: '[local]',
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
              use: {
                stylus: { ...stylusOptions },
              },
              modules: {
                localsConvention: 'camelCase',
                generateScopedName: '[local]',
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
      : undefined,
  })

  const yozoraCssRegex = /^@yozora\/([\S]*)\/lib\/([\S]*)\.css$/
  return configs.map(config => {
    const { external } = config
    if (!(external instanceof Function)) return config

    return {
      ...config,
      external: id => {
        if (yozoraCssRegex.test(id)) return false
        return external(id)
      },
    }
  })
}

const configs = rollupConfig()
export default configs
