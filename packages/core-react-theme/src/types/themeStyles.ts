import type { IThemeBreakpoints } from './breakpoints'
import type { IThemeColors } from './colors'
import type { IThemeEffects } from './effects'
import type { IThemeFonts } from './fonts'
import type { IThemeSpacing } from './spacing'

export interface IThemeStyles {
  breakpoints: IThemeBreakpoints
  colors: IThemeColors
  effects: IThemeEffects
  fonts: IThemeFonts
  spacing: IThemeSpacing
}
