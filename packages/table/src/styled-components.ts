import 'styled-components'
import type { YozoraTableTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    table?: YozoraTableTheme
  }
}
