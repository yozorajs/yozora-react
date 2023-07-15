export interface IBreakpoints {
  xs: string
  xsMinus: string
  xsPlus: string
  sm: string
  smMinus: string
  smPlus: string
  md: string
  mdMinus: string
  mdPlus: string
  lg: string
  lgMinus: string
  lgPlus: string
  xl: string
  xlMinus: string
  xlPlus: string
}

export interface IThemeContext {
  readonly theme: 'light' | 'darken' | string
  readonly breakpoints: Readonly<IBreakpoints>
  readonly showCodeLineNo: boolean
}
