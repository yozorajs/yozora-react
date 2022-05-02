import React from 'react'
import { createLightThemeStyle } from './themeStyle/light'
import type { IThemeStyle } from './types'
import { Theme } from './types'

export interface IThemePreference {
  showCodeLineNo: boolean
}

export interface IThemeContext<D = unknown> {
  theme: Theme
  themeStyle: IThemeStyle<D>
  preference: IThemePreference
}

export const ThemeContextType = React.createContext<IThemeContext>({
  theme: Theme.LIGHT,
  themeStyle: createLightThemeStyle(),
  preference: {
    showCodeLineNo: true,
  },
})

export const useThemeContext = <D>(): IThemeContext<D> =>
  React.useContext<IThemeContext>(ThemeContextType) as IThemeContext<D>
