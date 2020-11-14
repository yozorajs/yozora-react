import 'styled-components'
import type { YozoraEmphasisTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    emphasis?: YozoraEmphasisTheme
  }
}
