import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import React from 'react'
import type { IYozoraThemeContext, IYozoraThemePreference } from './context'
import { YozoraThemeContextType } from './context'
import type { IThemeStyle, Theme } from './types'
import { createPreference, defaultThemeStyleCreator } from './util'

export interface IYozoraThemeContextProviderProps<D = unknown> {
  theme: Theme
  preference?: Partial<IYozoraThemePreference>
  customStyle?: D
  children?: React.ReactNode
  createThemeStyle?(theme: Theme, custom?: D): IThemeStyle
}

export const YozoraThemeContextProvider: React.FC<IYozoraThemeContextProviderProps> = props => {
  const { theme, preference, customStyle, createThemeStyle = defaultThemeStyleCreator } = props
  const context: IYozoraThemeContext = useDeepCompareMemo(
    () => ({
      theme,
      themeStyle: createThemeStyle(theme, customStyle),
      preference: createPreference(preference),
    }),
    [theme, customStyle, preference],
  )
  return (
    <YozoraThemeContextType.Provider value={context}>
      {props.children}
    </YozoraThemeContextType.Provider>
  )
}

YozoraThemeContextProvider.displayName = 'YozoraThemeContextProvider'
