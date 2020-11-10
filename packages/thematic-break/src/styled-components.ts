import 'styled-components'
import type { YozoraThematicBreakTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    thematicBreak: YozoraThematicBreakTheme
  }
}
