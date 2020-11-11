import 'styled-components'
import type { YozoraHeadingTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    heading?: YozoraHeadingTheme
  }
}
