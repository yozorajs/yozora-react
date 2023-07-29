import React from 'react'
import type { IBreakpoints, IThemeContext } from './types'
import { YozoraReactTheme } from './YozoraReactTheme'

export interface IThemeProviderProps {
  readonly theme?: 'light' | 'darken' | string
  readonly breakpoints?: Readonly<IBreakpoints>
  readonly children?: React.ReactNode
  readonly className?: string
}

const initialThemeContext: IThemeContext = {
  theme: 'light',
  breakpoints: {
    xs: '(max-width: 479px)',
    xsMinus: '(max-width: 479px)',
    xsPlus: '(min-width: 0px)',
    sm: '(min-width: 480px) and (max-width: 767px)',
    smMinus: '(max-width: 767px)',
    smPlus: '(min-width: 480px)',
    md: '(min-width: 768px) and (max-width: 991px)',
    mdMinus: '(max-width: 991px)',
    mdPlus: '(min-width: 768px)',
    lg: '(min-width: 992px) and (max-width: 1199px)',
    lgMinus: '(max-width: 1199px)',
    lgPlus: '(min-width: 992px)',
    xl: '(min-width: 1200px) and (max-width: 1535px)',
    xlMinus: '(max-width: 1535px)',
    xlPlus: '(min-width: 1200px)',
  },
}

const ThemeContextType = React.createContext<IThemeContext>(initialThemeContext)

export const useThemeContext = (): IThemeContext => React.useContext(ThemeContextType)

export const ThemeProvider: React.FC<IThemeProviderProps> = props => {
  const {
    theme = initialThemeContext.theme, //
    breakpoints = initialThemeContext.breakpoints,
  } = props
  const context: IThemeContext = React.useMemo<IThemeContext>(
    () => ({ theme, breakpoints }),
    [theme, breakpoints],
  )

  return (
    <ThemeContextType.Provider value={context}>
      <YozoraReactTheme theme={theme} breakpoints={breakpoints} className={props.className}>
        {props.children}
      </YozoraReactTheme>
    </ThemeContextType.Provider>
  )
}
