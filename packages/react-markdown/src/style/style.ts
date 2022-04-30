import { css, cx } from '@emotion/css'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'

export const useStyles = (): string => {
  const { themeStyle } = useThemeContext()
  return React.useMemo(() => {
    const { colors, effects, spacing } = themeStyle
    return cx(
      css({
        '.yozora-admonition.yozora-admonition': {
          '--yozora-admonition--note-bg-color': colors.background.note,
          '--yozora-admonition--note-border-color': colors.border.note,
          '--yozora-admonition--info-bg-color': colors.background.info,
          '--yozora-admonition--info-border-color': colors.border.info,
          '--yozora-admonition--tip-bg-color': colors.background.success,
          '--yozora-admonition--tip-border-color': colors.border.success,
          '--yozora-admonition--caution-bg-color': colors.background.warning,
          '--yozora-admonition--caution-border-color': colors.border.warning,
          '--yozora-admonition--danger-bg-color': colors.background.error,
          '--yozora-admonition--danger-border-color': colors.border.error,
          margin: spacing.margin.blockNode,
        },
        '.yozora-footnote-reference': {
          '> a': {
            display: 'inline-block',
            lineHeight: 1.2,
            textDecoration: 'none',
            '&:active': {
              color: effects.active.colors.text.link,
            },
            '&:hover': {
              color: effects.hover.colors.text.link,
              transform: 'scale(1.2)',
            },
            '&:visited': {
              color: effects.visited.colors.text.link,
            },
          },
        },
        '.yozora-inline-math': {
          padding: 0,
          border: 'none',
          margin: 0,
          background: 'transparent',
          color: colors.text.math,
        },
        '.yozora-math': {
          overflow: 'auto',
          border: 'none',
          margin: '0 0 1em',
          background: 'transparent',
          color: colors.text.math,
        },
      }),
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
  }, [themeStyle])
}
