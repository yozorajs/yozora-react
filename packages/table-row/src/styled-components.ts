import 'styled-components'
import type { YozoraTableRowTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    tableRow?: YozoraTableRowTheme
  }
}
