import React from 'react'
import { createLightThemeStyle } from './themeStyle/light'
import type { IThemeStyle } from './types'
import { Theme } from './types'

export interface IYozoraThemePreference {
  showCodeLineNo: boolean
}

export interface IYozoraThemeContext<D = unknown> {
  theme: Theme
  themeStyle: IThemeStyle<D>
  preference: IYozoraThemePreference
}

export const YozoraThemeContextType = React.createContext<IYozoraThemeContext>({
  theme: Theme.LIGHT,
  themeStyle: createLightThemeStyle(),
  preference: {
    showCodeLineNo: true,
  },
})

export const useThemeContext = <D>(): IYozoraThemeContext<D> =>
  React.useContext<IYozoraThemeContext>(YozoraThemeContextType) as IYozoraThemeContext<D>
