import 'styled-components'
import type { YozoraInlineCodeTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    inlineCode: YozoraInlineCodeTheme
  }
}
