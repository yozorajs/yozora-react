import type { CSSInterpolation } from '@emotion/css'
import { css } from '@emotion/css'
import type { INodeStyleMap } from '../types'

export const nodeStyleMap: INodeStyleMap = {
  blockquote: {
    '.yozora-blockquote': {
      boxSizing: 'border-box',
      padding: '0.625em 1em',
      borderLeft: '0.25em solid var(--color-border-blockquote)',
      margin: 'var(--spacing-margin-blockNode)',
      background: 'var(--color-bg-blockquote)',
      boxShadow: '0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1)',
      '> :last-child': {
        marginBottom: 0,
      },
    },
  },
  break: {
    '.yozora-break': {
      boxSizing: 'border-box',
    },
  },
  code: {
    '.yozora-code': {
      margin: 'var(--spacing-margin-blockNode)',
    },
  },
  delete: {
    '.yozora-delete': {
      marginRight: '4px',
      color: 'var(--color-delete)',
      fontStyle: 'italic',
      textDecoration: 'line-through',
    },
  },
  emphasis: {
    '.yozora-emphasis': {
      fontStyle: 'italic',
      margin: 'var(--spacing-margin-emphasis)',
    },
  },
  heading: {
    '.yozora-heading': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      margin: 'var(--spacing-margin-blockNode)',
      marginBottom: '1em',
      lineHeight: 1.25,
      fontFamily: 'var(--font-family-heading)',
      color: 'var(--color-heading)',
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
        color: 'var(--color-link)',
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
          color: 'var(--active-color-link)',
        },
      },
      '&:hover': {
        '.yozora-heading__anchor': {
          opacity: 0.8,
          color: 'var(--hover-color-link)',
        },
      },
    },
    'h1.yozora-heading': {
      padding: '0.3rem 0',
      borderBottom: '1px solid var(--color-border-heading)',
      fontSize: '2rem',
      fontStyle: 'normal',
      fontWeight: 500,
    },
    'h2.yozora-heading': {
      padding: '0.3rem 0',
      borderBottom: '1px solid var(--color-border-heading)',
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
  },
  image: {
    '.yozora-image': {
      boxSizing: 'border-box',
      maxWidth: '100%', // Prevent images from overflowing the container.
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0,
      '> img': {
        flex: '1 0 auto',
        boxSizing: 'border-box',
        maxWidth: '100%',
        border: '1px solid var(--color-border-image)',
        boxShadow: '0 0 20px 1px rgba(126, 125, 150, 0.6)',
      },
      '> figcaption': {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: '1em',
        color: 'var(--color-imageTitle)',
      },
    },
  },
  inlineCode: {
    '.yozora-inline-code': {
      padding: '1px 4px',
      borderRadius: '4px',
      margin: 0,
      background: 'var(--color-bg-inlineCode)',
      lineHeight: 1.375,
      color: 'var(--color-inlineCode)',
      fontFamily: 'var(--font-family-code)',
      fontSize: 'min(1rem, 18px)',
      fontWeight: 500,
    },
  },
  link: {
    '.yozora-link': {
      padding: '0.2rem 0',
      color: 'var(--color-link)',
      textDecoration: 'none',
      background:
        'linear-gradient(90deg, hsla(358deg, 100%, 62%, 0.8), hsla(048deg, 100%, 50%, 0.8), hsla(196deg, 100%, 53%, 0.8))',
      backgroundSize: '0 3px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 100%',
      transition: 'all 0.3s ease-in-out',
      '&:active': {
        color: 'var(--active-color-link)',
      },
      '&:hover': {
        color: 'var(--hover-color-link)',
        backgroundSize: '100% 3px',
        backgroundPositionX: 0,
      },
      '&:visited': {
        color: 'var(--visited-color-link)',
      },
    },
  },
  list: {
    '.yozora-list': {
      padding: 0,
      margin: '0 0 1em 2em',
      lineHeight: 2,
      '> :last-child': {
        marginBottom: 0,
      },
    },
  },
  listItem: {
    '.yozora-list-item': {
      position: 'relative',
      padding: 0,
      margin: 0,
      '> :last-child': {
        marginBottom: 0,
      },
    },
  },
  paragraph: {
    '.yozora-paragraph': {
      overflow: 'auto hidden',
      padding: 0,
      margin: 'var(--spacing-margin-blockNode)',
      marginBottom: '1em',
      lineHeight: 1.8,
      hyphens: 'auto',
      wordBreak: 'normal',
      letterSpacing: '1px',
      overflowWrap: 'break-word',
      '> :last-child': {
        marginBottom: 0,
      },
      '&.yozora-paragraph--display': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0',
        margin: 0,
      },
    },
  },
  strong: {
    '.yozora-strong': {
      fontWeight: 600,
    },
  },
  table: {
    '.yozora-table': {
      display: 'block',
      overflow: 'auto',
      width: 'max-content',
      maxWidth: '100%',
      padding: 0,
      borderCollapse: 'collapse',
      borderRadius: '6px',
      borderSpacing: 0,
      border: '1px solid var(--color-border-table)',
      margin: '0 auto 1.25em',
      lineHeight: 1.6,
      '> thead': {
        backgroundColor: 'var(--color-bg-tableHead)',
        borderBottom: '1px solid #f0f0f0',
        th: {
          padding: '0.5rem 1rem',
          borderLeft: '1px solid var(--color-border-table)',
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
          borderTop: '1px solid var(--color-border-table)',
          backgroundColor: 'var(--color-bg-tableOddRow)',
        },
        'tr:nth-child(2n)': {
          backgroundColor: 'var(--color-bg-tableEvenRow)',
        },
        td: {
          padding: '0.5rem 1rem',
          borderLeft: '1px solid var(--color-border-table)',
          '&:first-child': {
            borderLeft: 'none',
          },
        },
      },
    },
  },
  thematicBreak: {
    '.yozora-thematic-break': {
      boxSizing: 'content-box',
      display: 'block',
      height: 0,
      width: '100%',
      padding: 0,
      border: 0,
      borderBottom: '1px solid var(--color-border-thematicBreak)',
      outline: 0,
      margin: 'var(--spacing-margin-thematicBreak)',
    },
  },
}

export const nodeStyle = css({
  ...Object.values(nodeStyleMap).reduce(
    (acc, cur): Record<string, CSSInterpolation> => ({ ...acc, ...cur }),
    {},
  ),
})
