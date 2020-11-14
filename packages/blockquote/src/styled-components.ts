import 'styled-components'
import type { YozoraBlockquoteTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    blockquote?: YozoraBlockquoteTheme
  }
}
