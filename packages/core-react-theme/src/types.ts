export enum Theme {
  DARKEN = 'darken',
  LIGHT = 'light',
}

export interface IThemeStyle<D = unknown> {
  breakpoints: IThemeBreakpoints
  colors: IThemeColors
  effects: IThemeEffects
  fonts: IThemeFonts
  palette: IThemePalette
  spacing: IThemeSpacing
  custom: D
}

export interface IThemeBreakpoint {
  exact: string
  exactOrMinus: string
  exactOrPlus: string
}

export interface IThemeBreakpoints {
  xs: IThemeBreakpoint
  sm: IThemeBreakpoint
  md: IThemeBreakpoint
  lg: IThemeBreakpoint
  xl: IThemeBreakpoint
}

export interface IThemeColors {
  background: {
    note: string
    info: string
    success: string
    warning: string
    error: string

    // elements
    blockquote: string
    code: string
    codeHighlight: string
    inlineCode: string
    tableHead: string
    tableOddRow: string
    tableEvenRow: string
  }
  border: {
    note: string
    info: string
    success: string
    warning: string
    error: string

    // elements
    blockquote: string
    code: string
    codeLineno: string
    heading: string
    image: string
    table: string
    thematicBreak: string
  }
  text: {
    // elements
    codeTitle: string
    deleted: string
    heading: string
    imageTitle: string
    inlineCode: string
    link: string
    math: string
  }
  selection: {
    // elements
    code: string
  }
  caret: {
    // elements
    code: string
  }
}

export interface IThemeEffects {
  hover: {
    colors: IThemeColors
  }
  active: {
    colors: IThemeColors
  }
  visited: {
    colors: IThemeColors
  }
}

export interface IThemeFonts {
  family: {
    code: string
    heading: string
    body: string
  }
  size: {
    code: string
  }
}

export interface IThemePalette {
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
}

export interface IThemeSpacing {
  margin: {
    blockNode: string
    emphasis: string
    thematicBreak: string
  }
}
