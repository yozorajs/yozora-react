import React from 'react'
import { ThemeSchema } from './constant'
import { createLightThemeStyle } from './schema/light'
import type { IThemeStyles } from './types/themeStyles'

export interface IThemePreference {
  showCodeLineNo: boolean
}

export interface IThemeContext {
  themeSchema: ThemeSchema
  themeStyles: IThemeStyles
  preference: IThemePreference
}

const ThemeContextType = React.createContext<IThemeContext>({
  themeSchema: ThemeSchema.LIGHT,
  themeStyles: createLightThemeStyle(),
  preference: {
    showCodeLineNo: true,
  },
})

export const useThemeContext = (): IThemeContext => React.useContext(ThemeContextType)
export const ThemeProvider = ThemeContextType.Provider
