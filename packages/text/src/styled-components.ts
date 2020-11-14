import 'styled-components'
import type { YozoraTextTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    text?: YozoraTextTheme
  }
}
