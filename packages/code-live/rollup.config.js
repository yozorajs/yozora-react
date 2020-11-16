import path from 'path'
import { createRollupConfig } from '@barusu-react/rollup-config'
import manifest from './package.json'


const resolvePath = p => path.resolve(__dirname, p)
const paths = {
  source: {
    assetsRoot: resolvePath('src/assets'),
  },
  eslintrc: resolvePath('.eslintrc.js'),
  tsconfig: resolvePath('tsconfig.src.json'),
}


const config = createRollupConfig({
  manifest,
  pluginOptions: {
    typescriptOptions: {
      tsconfig: paths.tsconfig,
    },
    postcssOptions: {
      extract: false,
      minimize: true,
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: 'yozora-[local]',
      },
      pluginOptions: {
        postcssUrlOptions: {
          url: 'inline',
          basePath: paths.source.assetsRoot,
        }
      },
    }
  }
})


const resolvedConfig = [config]


export default resolvedConfig
