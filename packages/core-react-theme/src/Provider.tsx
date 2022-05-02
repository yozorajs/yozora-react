import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import React from 'react'
import type { IThemeContext, IThemePreference } from './context'
import { ThemeContextType } from './context'
import type { IThemeStyle } from './types'
import { Theme } from './types'
import { createPreference, defaultThemeStyleCreator } from './util'

export interface IThemeContextProviderProps<D = unknown> {
  theme?: Theme
  preference?: Partial<IThemePreference>
  customStyle?: D
  children?: React.ReactNode
  createThemeStyle?(theme: Theme, custom?: D): IThemeStyle
}

export const ThemeContextProvider: React.FC<IThemeContextProviderProps> = props => {
  const {
    theme = Theme.LIGHT,
    preference,
    customStyle,
    createThemeStyle = defaultThemeStyleCreator,
  } = props
  const context: IThemeContext = useDeepCompareMemo(
    () => ({
      theme,
      themeStyle: createThemeStyle(theme, customStyle),
      preference: createPreference(preference),
    }),
    [theme, customStyle, preference],
  )
  return <ThemeContextType.Provider value={context}>{props.children}</ThemeContextType.Provider>
}

ThemeContextProvider.displayName = 'YozoraThemeContextProvider'
