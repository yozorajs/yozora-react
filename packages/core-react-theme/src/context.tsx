import { css, cx } from '@emotion/css'
import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import React from 'react'
import { darkenSchema } from './schema/darken'
import { lightSchema } from './schema/light'
import type { IBreakpoints, IThemeContext } from './types'
import { schema2css } from './util'

export interface IThemeProviderProps {
  readonly theme?: 'light' | 'darken' | string
  readonly breakpoints?: Readonly<IBreakpoints>
  readonly showCodeLineNo?: boolean
  readonly children?: React.ReactNode
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
  showCodeLineNo: true,
}

const ThemeContextType = React.createContext<IThemeContext>(initialThemeContext)

export const useThemeContext = (): IThemeContext => React.useContext(ThemeContextType)

export const ThemeProvider: React.FC<IThemeProviderProps> = props => {
  const {
    theme = initialThemeContext.theme, //
    breakpoints = initialThemeContext.breakpoints,
    showCodeLineNo = initialThemeContext.showCodeLineNo,
  } = props
  const context: IThemeContext = useDeepCompareMemo<IThemeContext>(
    () => ({ theme, breakpoints, showCodeLineNo }),
    [theme, breakpoints, showCodeLineNo],
  )
  return (
    <div className={cx('yozora-theme-root', cls)} data-theme={theme}>
      <ThemeContextType.Provider value={context}>{props.children}</ThemeContextType.Provider>
    </div>
  )
}

const cls = css`
  &[data-theme="light"] {
    ${schema2css(lightSchema)}
  }
  &[data-theme="darken"] {
    ${schema2css(darkenSchema)}
  }
`
