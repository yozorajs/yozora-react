import 'styled-components'
import type { YozoraTableCellTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    tableCell?: YozoraTableCellTheme
  }
}
