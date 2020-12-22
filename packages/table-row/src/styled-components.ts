import type { YozoraTableRowTheme } from './theme'
import 'styled-components'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    tableRow?: YozoraTableRowTheme
  }
}
