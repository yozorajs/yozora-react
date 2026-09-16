import React from 'react'
import { defaultSmallScreenQuery } from './breakpoint'
import { getThemeSchema } from './registry'
import type { IBreakpoints, IThemeContext } from './types'
import { YozoraReactTheme } from './YozoraReactTheme'

export interface IThemeProviderProps {
  readonly theme?: string
  /** Built-in variant, for example dark-modern for vsc or mocha for catppuccin. */
  readonly variant?: string
  readonly breakpoints?: Readonly<IBreakpoints>
  /** CSP nonce for custom breakpoint styles; inherited from the parent provider by default. */
  readonly nonce?: string
  readonly children?: React.ReactNode
  readonly className?: string
}

const initialThemeContext: IThemeContext = {
  theme: 'vsc',
  variant: 'light-modern',
  breakpoints: {
    xs: defaultSmallScreenQuery,
    xsMinus: defaultSmallScreenQuery,
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
  const inheritedNonce = useThemeContext().nonce
  const {
    theme = initialThemeContext.theme, //
    variant = props.theme === undefined ? initialThemeContext.variant : undefined,
    breakpoints = initialThemeContext.breakpoints,
    nonce = inheritedNonce,
  } = props
  const schema = React.useMemo(() => getThemeSchema(theme, variant), [theme, variant])
  const themeName = schema?.theme ?? theme
  const themeVariant = schema?.variant ?? variant
  const context: IThemeContext = React.useMemo<IThemeContext>(
    () => ({ theme: themeName, variant: themeVariant, schema, breakpoints, nonce }),
    [themeName, themeVariant, schema, breakpoints, nonce],
  )

  return (
    <ThemeContextType.Provider value={context}>
      <YozoraReactTheme
        theme={themeName}
        variant={themeVariant}
        query={breakpoints.xsMinus}
        nonce={nonce}
        className={props.className}
      >
        {props.children}
      </YozoraReactTheme>
    </ThemeContextType.Provider>
  )
}
