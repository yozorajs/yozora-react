import 'styled-components'
import type { YozoraListItemTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    listItem?: YozoraListItemTheme
  }
}
