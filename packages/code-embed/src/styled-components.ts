import 'styled-components'
import type { YozoraCodeEmbedTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    codeEmbed?: YozoraCodeEmbedTheme
  }
}
