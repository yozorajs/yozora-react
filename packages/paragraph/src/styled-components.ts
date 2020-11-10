import 'styled-components'
import type { YozoraParagraphTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    paragraph: YozoraParagraphTheme
  }
}
