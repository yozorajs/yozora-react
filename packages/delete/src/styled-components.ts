import 'styled-components'
import type { YozoraDeleteTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    delete?: YozoraDeleteTheme
  }
}
