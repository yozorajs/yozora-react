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
          margin: spacing.margin.blockNode,
        },
        '.yozora-footnote-definition': {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          padding: 0,
          margin: 0,
          '.yozora-footnote-definition__title': {
            flex: '0 0 auto',
            display: 'inline-block',
            userSelect: 'none',
            marginTop: -1,
          },
          '.yozora-footnote-definition__content': {
            flex: '1 1 auto',
            overflowX: 'auto',
            display: 'inline-block',
            margin: 0,
            padding: 0,
          },
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
        '.yozora-list-task-item': {
          listStyleType: 'none',
          '> .yozora-list-task-item__checkbox': {
            fontVariant: 'tabular-nums',
            fontFeatureSettings: '"tnum"',
            whiteSpace: 'nowrap',
            cursor: 'not-allowed',
            touchAction: 'manipulation',
            userSelect: 'none',

            // TODO fix vertical align.
            position: 'absolute',
            top: '8px',
            left: '-1.2rem',
            boxSizing: 'border-box',
            display: 'inline-block',
            width: '0.9rem',
            height: '0.9rem',
            lineHeight: '0.8rem',

            '> input': {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
              padding: 0,
              margin: 0,
              border: 0,
              cursor: 'pointer',
              opacity: 0,
              visibility: 'hidden',
            },
            '> span': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              border: '1px solid #9dafaf',
              borderRadius: '2px',
              backgroundColor: '#f5f5f5',
              width: '100%',
              height: '100%',
              '&::after': {
                content: '"."',
                display: 'inline-block',
                border: 0,
                color: 'transparent',
              },
              '&[data-status="doing"]::after': {
                backgroundColor: colors.border.info,
                width: '0.4rem',
                height: '0.4rem',
              },
              '&[data-status="done"]': {
                backgroundColor: colors.border.info,
                borderColor: colors.border.info,
                '&::after': {
                  transform: 'rotate(45deg) scale(1) translate(-4%, -5%)',
                  height: '0.5012rem',
                  width: '0.2468rem',
                  border: '2px solid #fff',
                  borderTop: 0,
                  borderLeft: 0,
                },
              },
            },
          },
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
        // colors
        '--yozora-colors-background-note': colors.background.note,
        '--yozora-colors-background-info': colors.background.info,
        '--yozora-colors-background-success': colors.background.success,
        '--yozora-colors-background-warning': colors.background.warning,
        '--yozora-colors-background-error': colors.background.error,
        '--yozora-colors-border-note': colors.border.note,
        '--yozora-colors-border-info': colors.border.info,
        '--yozora-colors-border-success': colors.border.success,
        '--yozora-colors-border-warning': colors.border.warning,
        '--yozora-colors-border-error': colors.border.error,
        '--yozora-colors-background-codeHighlight': colors.background.codeHighlight,
        '--yozora-colors-border-codeLineno': colors.border.codeLineno,
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
