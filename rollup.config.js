import createRollupConfigs from '@guanghechen/rollup-config-tsx'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import fs from 'fs-extra'
import path from 'path'
import tsconfig from './tsconfig.json'

const resolvePath = (...p) => path.join(__dirname, ...p)

const paths = {
  _shared: resolvePath('packages/_shared/'),
  assetPath: path.resolve('lib'),
  basePath: path.resolve('src'),
  styleFile: path.resolve('src/style/index.styl'),
  tsconfig: path.resolve('tsconfig.src.json'),
  alias: Object.entries(tsconfig.compilerOptions.paths)
    .map(([key, val]) => val.map(x => [key, x]))
    .flat()
    .filter(([key, val]) => key && val)
    .flatMap(([key, val]) => ({
      find: key.replace(/[*]$/, ''),
      replacement: resolvePath(val.replace(/[*]$/, '')),
    }))
    .filter(item => !/[*]/.test(item.find))
    .sort((x, y) => {
      if (x.find === y.find) return 0
      return x.find < y.find ? 1 : -1
    }),
}

export async function rollupConfig() {
  const { default: manifest } = await import(path.resolve('package.json'))

  const stylusOptions = {
    imports: [path.join(paths._shared, 'src/stylus/index.styl')],
    paths: [resolvePath('node_modules')],
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
    const { external, plugins } = config

    return {
      ...config,
      external:
        external instanceof Function
          ? id => {
              if (yozoraCssRegex.test(id)) return false
              return external(id)
            }
          : external,
      plugins: [
        alias({
          customResolver: resolve({
            extensions: ['.css', '.js', '.jsx', '.json', '.mjs', '.styl', '.ts', '.tsx'],
          }),
          entries: [...paths.alias],
        }),
        ...(plugins ?? []),
      ],
    }
  })
}

const configs = rollupConfig()
export default configs
