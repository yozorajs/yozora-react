import { css, cx } from '@emotion/css'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'
import { basicStyle } from '../style/basicStyle'
import { nodeStyle } from '../style/nodeStyle'

export const useStyles = (): string => {
  const { xsMinus } = useThemeContext().breakpoints
  return React.useMemo<string>(() => {
    // Adaptive small screen.
    const xsStyle: string = css({
      [`@media screen and ${xsMinus}`]: {
        '.yozora-paragraph': {
          letterSpacing: 0,
          lineHeight: 1.6,
        },
      },
    })
    return cx(basicStyle, nodeStyle, xsStyle)
  }, [xsMinus])
}
