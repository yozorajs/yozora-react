import type { IThemeBreakpoints, IThemeFonts, IThemeSpacing } from '../types'

export const createBreakPoints = (): IThemeBreakpoints => ({
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
})

export const createFonts = (): IThemeFonts => ({
  heading: `'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif`,
})

export const createSpacing = (): IThemeSpacing => ({
  margin: {
    blockNode: '0 0 1 1.25em',
  },
})
