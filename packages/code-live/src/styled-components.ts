import 'styled-components'
import type { YozoraCodeLiveTheme } from './theme'


declare module 'styled-components' {
  export interface DefaultTheme {
    yozora: YozoraTheme
  }

  interface YozoraTheme {
    codeLive?: YozoraCodeLiveTheme
  }
}
