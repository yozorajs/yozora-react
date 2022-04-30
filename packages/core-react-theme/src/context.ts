import React from 'react'
import { createLightThemeStyle } from './themeStyle/light'
import type { IThemeStyle } from './types'
import { Theme } from './types'

export interface IYozoraThemeContext {
  theme: Theme
  themeStyle: IThemeStyle
  preference: {
    showCodeLineNo: boolean
  }
}

export const YozoraThemeContextType = React.createContext<IYozoraThemeContext>({
  theme: Theme.LIGHT,
  themeStyle: createLightThemeStyle(),
  preference: {
    showCodeLineNo: true,
  },
})

export const useThemeContext = (): IYozoraThemeContext =>
  React.useContext<IYozoraThemeContext>(YozoraThemeContextType)
