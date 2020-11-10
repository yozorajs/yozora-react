import 'styled-components'
import type { YozoraLinkTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    link: YozoraLinkTheme
  }
}
