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

export interface IThemeBreakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
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
    heading: string
    image: string
    table: string
    thematicBreak: string
  }
  text: {
    // elements
    deleted: string
    heading: string
    imageTitle: string
    inlineCode: string
    link: string
    math: string
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
  heading: {
    family: string
  }
  code: {
    family: string
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
