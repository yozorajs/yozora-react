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
    table: string
  }
  text: {
    primary: string
    secondary: string
    tertiary: string

    // elements
    deleted: string
    link: string
    imageTitle: string
  }
}

export interface IThemeEffects {
  hover: {
    colors: IThemeColors
  }
  active: {
    colors: IThemeColors
  }
}

export interface IThemeFonts {
  heading: string
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
  }
}
