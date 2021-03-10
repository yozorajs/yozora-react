import type { YozoraMathTheme } from './theme'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    math?: YozoraMathTheme
  }
}
