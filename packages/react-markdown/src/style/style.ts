import { css, cx } from '@emotion/css'
import React from 'react'

export const useStyles = (): string => {
  return React.useMemo(() => {
    return cx(
      css({
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        '.yozora-list-item': {
          '> .yozora-list': {
            marginLeft: '1.2em',
          },
        },
      }),
    )
  }, [])
}
