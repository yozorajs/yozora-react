import React from 'react'
import { createLightThemeStyle } from './themeStyle/light'
import type { IThemeStyle } from './types'
import { Theme } from './types'

export interface IThemeContext {
  theme: Theme
  themeStyle: IThemeStyle
}

export const ThemeContextType = React.createContext<IThemeContext>({
  theme: Theme.LIGHT,
  themeStyle: createLightThemeStyle(),
})

export const useThemeContext = (): IThemeContext =>
  React.useContext<IThemeContext>(ThemeContextType)
