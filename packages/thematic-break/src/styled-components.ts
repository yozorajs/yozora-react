import type { YozoraThematicBreakTheme } from './theme'
import 'styled-components'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    thematicBreak?: YozoraThematicBreakTheme
  }
}
