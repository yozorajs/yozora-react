import 'styled-components'
import type { YozoraInlineMathTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    inlineMath: YozoraInlineMathTheme
  }
}
