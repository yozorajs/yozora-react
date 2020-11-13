import 'styled-components'
import type { YozoraCodeTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    code?: YozoraCodeTheme
  }
}
