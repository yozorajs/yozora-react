import { css, cx } from '@emotion/css'
import React from 'react'
import { tokens } from './constant/token'
import { commonSchema } from './schema/common'
import { darkenSchema } from './schema/darken'
import { lightSchema } from './schema/light'
import type { IBreakpoints } from './types'

interface IProps {
  theme: 'light' | 'darken' | string
  breakpoints: IBreakpoints
  className?: string
  children: React.ReactNode
}

export class YozoraReactTheme extends React.PureComponent<IProps> {
  public override render(): React.ReactElement {
    const { theme, breakpoints, className, children } = this.props

    const cls = cx(
      'yozora-theme-root',
      classes.common,
      theme === 'light' && classes.light,
      theme === 'darken' && classes.darken,
      className,
      css({
        [`@media screen and ${breakpoints.xsMinus}`]: {
          '.yozora-paragraph': {
            letterSpacing: 0,
            lineHeight: 1.6,
          },
        },
      }),
    )

    return <div className={cls}>{children}</div>
  }
}

const classes = {
  common: css({
    ...commonSchema,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    '& ::-webkit-scrollbar': {
      width: 4,
      height: 4,
    },
    '& ::-webkit-scrollbar-corner': {
      display: 'none',
    },
    '& ::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '& ::-webkit-scrollbar-thumb': {
      border: '3px solid hsl(0, 0%, 50%)',
      background: 'hsl(0, 0%, 60%)',
      borderRadius: '4px',

      '&&:hover': {
        borderColor: 'hsl(0, 0%, 70%)',
      },
    },
    a: {
      color: tokens.colorLink,
      textDecoration: 'none',
      '&:visited': {
        color: tokens.colorLinkVisited,
      },
      '&&:hover': {
        color: tokens.colorLinkHover,
      },
    },
  }),
  light: css(lightSchema),
  darken: css(darkenSchema),
}
