import 'styled-components'
import type { YozoraListTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    list?: YozoraListTheme
  }
}
