import type { IYozoraThemePreference } from './context'
import { createDarkenThemeStyle } from './themeStyle/darken'
import { createLightThemeStyle } from './themeStyle/light'
import type { IThemeStyle } from './types'
import { Theme } from './types'

export const defaultThemeStyleCreator = <D = unknown>(theme: Theme, custom?: D): IThemeStyle => {
  switch (theme) {
    case Theme.DARKEN:
      return createDarkenThemeStyle(custom)
    case Theme.LIGHT:
      return createLightThemeStyle(custom)
    default:
      return createLightThemeStyle(custom)
  }
}

export const createPreference = (
  customPreference?: Partial<IYozoraThemePreference> | undefined,
): IYozoraThemePreference => {
  return {
    showCodeLineNo: true,
    ...customPreference,
  }
}
