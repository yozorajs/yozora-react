import 'styled-components'
import type { YozoraMathTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    math?: YozoraMathTheme
  }
}
