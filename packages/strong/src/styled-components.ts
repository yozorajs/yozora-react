import 'styled-components'
import type { YozoraStrongTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    strong: YozoraStrongTheme
  }
}
