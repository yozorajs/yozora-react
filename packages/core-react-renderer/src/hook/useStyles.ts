import { css, cx } from '@emotion/css'
import { useDeepCompareMemo } from '@yozora/core-react-hook'
import { useThemeContext } from '@yozora/core-react-theme'
import { basicStyle } from '../style/basicStyle'
import { nodeStyle } from '../style/nodeStyle'

export const useStyles = (): string => {
  const { breakpoints } = useThemeContext().themeStyles
  return useDeepCompareMemo<string>(() => {
    // Adaptive small screen.
    const xsStyle: string = css({
      [`@media screen and ${breakpoints.xs.exactOrMinus}`]: {
        '.yozora-paragraph': {
          letterSpacing: 0,
          lineHeight: 1.6,
        },
      },
    })
    return cx(basicStyle, nodeStyle, xsStyle)
  }, [breakpoints])
}
