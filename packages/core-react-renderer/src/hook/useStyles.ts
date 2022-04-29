import { css, cx } from '@emotion/css'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'
import type { INodeStyleMap } from '../types'

export const useStyles = (customStyles: Readonly<Partial<INodeStyleMap>> | undefined): string => {
  const { themeStyle } = useThemeContext()
  return React.useMemo<string>(() => {
    const { colors, effects, fonts, spacing } = themeStyle
    const styleMap: INodeStyleMap = {
      blockquote: css({
        '.yozora-blockquote': {
          boxSizing: 'border-box',
          padding: '0.625em 1em',
          borderLeft: `0.25em solid ${colors.border.blockquote}`,
          margin: spacing.margin.blockNode,
          background: colors.background.blockquote,
          boxShadow: '0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1)',
        },
      }),
      break: css({
        '.yozora-break': {
          boxSizing: 'border-box',
        },
      }),
      delete: css({
        '.yozora-delete': {
          color: colors.text.deleted,
          textDecoration: 'line-through',
        },
      }),
      emphasis: css({
        '.yozora-emphasis': {
          fontStyle: 'italic',
          margin: spacing.margin.emphasis,
        },
      }),
      heading: css({
        '.yozora-heading': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 0,
          margin: spacing.margin.blockNode,
          marginBottom: '1em',
          lineHeight: 1.25,
          fontFamily: fonts.heading.family,
          color: colors.text.heading,
          '.yozora-heading__content': {
            flex: '0 1 auto',
            minWidth: 0,
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.7,
          },
          '.yozora-heading__anchor': {
            flex: '0 0 3rem',
            paddingLeft: '0.5rem',
            color: colors.text.link,
            opacity: 0,
            transition: 'color 0.2s ease-in-out, opacity 0.2s ease-in-out',
            userSelect: 'none',
            textDecoration: 'none',
            '> svg': {
              overflow: 'hidden',
              display: 'inline-block',
              verticalAlign: 'middle',
              fill: 'currentColor',
            },
          },
          '&:active': {
            '.yozora-heading__anchor': {
              opacity: 0.8,
              color: effects.active.colors.text.link,
            },
          },
          '&:hover': {
            '.yozora-heading__anchor': {
              opacity: 0.8,
              color: effects.hover.colors.text.link,
            },
          },
        },
        'h1.yozora-heading': {
          padding: '0.3rem 0',
          borderBottom: `1px solid ${colors.border.heading}`,
          fontSize: '2rem',
          fontStyle: 'normal',
          fontWeight: 500,
        },
        'h2.yozora-heading': {
          padding: '0.3rem 0',
          borderBottom: `1px solid ${colors.border.heading}`,
          fontSize: '1.5rem',
          fontStyle: 'normal',
          fontWeight: 500,
          marginBottom: '0.875rem',
        },
        'h3.yozora-heading': {
          fontSize: '1.25rem',
          fontStyle: 'normal',
          fontWeight: 500,
        },
        'h4.yozora-heading': {
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: 500,
        },
        'h5.yozora-heading': {
          fontSize: '0.875rem',
          fontStyle: 'normal',
          fontWeight: 500,
        },
        'h6.yozora-heading': {
          fontSize: '0.85rem',
          fontStyle: 'normal',
          fontWeight: 500,
        },
      }),
      image: css({
        '.yozora-image': {
          boxSizing: 'border-box',
          maxWidth: '100%', // Prevent images from overflowing the container.
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '> img': {
            flex: '1 0 auto',
            boxSizing: 'border-box',
            maxWidth: '100%',
            border: `1px solid ${colors.border.image}`,
            boxShadow: '0 0 20px 1px rgba(126, 125, 150, 0.6)',
          },
          '> figcaption': {
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: '1em',
            color: colors.text.imageTitle,
          },
        },
      }),
      inlineCode: css({
        '.yozora-inline-code': {
          padding: '1px 4px',
          borderRadius: '4px',
          margin: 0,
          background: colors.background.inlineCode,
          lineHeight: 1.375,
          color: colors.text.inlineCode,
          fontFamily: fonts.code.family,
          fontSize: 'min(1rem, 18px)',
          fontWeight: 500,
        },
      }),
      link: css({
        '.yozora-link': {
          padding: '0.2rem 0',
          color: colors.text.link,
          textDecoration: 'none',
          background:
            'linear-gradient(90deg, hsla(358deg, 100%, 62%, 0.8), hsla(048deg, 100%, 50%, 0.8), hsla(196deg, 100%, 53%, 0.8))',
          backgroundSize: '0 3px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 100%',
          transition: 'all 0.3s ease-in-out',
          '&:active': {
            color: effects.active.colors.text.link,
          },
          '&:hover': {
            color: effects.hover.colors.text.link,
            backgroundSize: '100% 3px',
            backgroundPositionX: 0,
          },
          '&:visited': {
            color: effects.visited.colors.text.link,
          },
        },
      }),
      list: css({
        '.yozora-list': {
          padding: 0,
          margin: '0 0 1em 2em',
          lineHeight: 2,
        },
      }),
      listItem: css({
        '.yozora-list-item': {
          position: 'relative',
          padding: 0,
          margin: 0,
        },
      }),
      paragraph: css({
        '.yozora-paragraph': {
          overflow: 'auto hidden',
          padding: 0,
          margin: spacing.margin.blockNode,
          marginBottom: '1em',
          lineHeight: 1.8,
          hyphens: 'auto',
          wordBreak: 'normal',
          letterSpacing: '1px',
          overflowWrap: 'break-word',
        },
      }),
      strong: css({
        'yozora-strong': {
          fontWeight: 600,
        },
      }),
      table: css({
        '.yozora-table': {
          display: 'block',
          overflow: 'auto',
          width: 'max-content',
          maxWidth: '100%',
          padding: 0,
          borderCollapse: 'collapse',
          borderRadius: '6px',
          borderSpacing: 0,
          border: `1px solid ${colors.border.table}`,
          margin: '0 auto 1.25em',
          lineHeight: 1.6,
          '> thead': {
            backgroundColor: colors.background.tableHead,
            borderBottom: '1px solid #f0f0f0',
            th: {
              padding: '0.5rem 1rem',
              borderLeft: `1px solid ${colors.border.table}`,
              wordBreak: 'normal',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&:first-child': {
                borderLeft: 'none',
              },
            },
          },
          '> tbody': {
            tr: {
              borderTop: `1px solid ${colors.border.table}`,
              backgroundColor: colors.background.tableOddRow,
            },
            'tr:nth-child(2n)': {
              backgroundColor: colors.background.tableEvenRow,
            },
            td: {
              padding: '0.5rem 1rem',
              borderLeft: `1px solid ${colors.border.table}`,
              '&:first-child': {
                borderLeft: 'none',
              },
            },
          },
        },
      }),
      thematicBreak: css({
        '.yozora-thematic-break': {
          boxSizing: 'content-box',
          display: 'block',
          height: 0,
          width: '100%',
          padding: 0,
          border: 0,
          borderBottom: `1px solid ${colors.border.thematicBreak}`,
          outline: 0,
          margin: spacing.margin.thematicBreak,
        },
      }),
      ...customStyles,
    }

    const markdownCls: string = cx(
      css({
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
      }),
      Object.values(styleMap),
    )
    return markdownCls
  }, [themeStyle, customStyles])
}
