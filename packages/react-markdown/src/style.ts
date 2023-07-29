import { css, cx } from '@emotion/css'
import { CommonTokenNames, tokens } from '@yozora/core-react-constant'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'

export const useStyles = (): string => {
  const smallScreenStyle = useSmallScreenStyle()
  return cx(basicStyle, patchStyle, smallScreenStyle)
}

const basicStyle: string = css({
  '.yozora-markdown': {
    fontFamily: tokens.fontFamilyBody,
    background: tokens.colorBgBody,
    color: tokens.colorBody,
    wordBreak: 'break-all',
    userSelect: 'unset',
  },
  '.yozora-admonition.yozora-admonition': {
    margin: tokens.marginBlockNode,
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
      fontSize: '10px',
      letterSpacing: '1px',
      textDecoration: 'none',
      '&:active': {
        color: tokens.colorLinkActive,
      },
      '&&:hover': {
        color: tokens.colorLinkHover,
        letterSpacing: '2px',
        transform: 'scale(1.2)',
      },
      '&:visited': {
        color: tokens.colorLinkVisited,
      },
    },
  },
  '.yozora-list-task-item': {
    listStyleType: 'none',
    '> .yozora-list-task-item__checkbox': {
      fontVariant: 'tabular-nums',
      fontFeatureSettings: '"tnum"',
      whiteSpace: 'nowrap',
      cursor: 'default',
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
          backgroundColor: tokens.colorBorderInfo,
          width: '0.4rem',
          height: '0.4rem',
        },
        '&[data-status="done"]': {
          backgroundColor: tokens.colorBorderInfo,
          borderColor: tokens.colorBorderInfo,
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
  '.yozora-inline-math': {
    padding: 0,
    border: 'none',
    margin: 0,
    background: 'transparent',
    color: tokens.colorMath,
  },
  '.yozora-inline-math.yozora-inline-math.yozora-inline-math': {
    'mjx-container [width="full"]': {
      width: 'auto',
    },
  },
  '.yozora-math': {
    display: 'block',
    overflow: 'auto',
    padding: '4px 0',
    border: 'none',
    height: 'fit-content',
    margin: tokens.marginBlockNode,
    background: 'transparent',
    color: tokens.colorMath,
  },
  '.yozora-math.yozora-math.yozora-math': {
    'mjx-container': {
      margin: 0,
      lineHeight: 'unset',
    },
    'mjx-assistive-mml': {
      display: 'none',
      right: 0,
      bottom: 0,
    },
  },
})

const patchStyle: string = css({
  '.yozora-admonition': {
    '.yozora-math': {
      color: 'inherit',
    },
    '.yozora-inline-math': {
      color: 'inherit',
    },
  },
  '.yozora-list-item': {
    '> .yozora-list': {
      marginLeft: '1.2em',
    },
  },
  '.yozora-code-renderer-graphviz': {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 0',
    marginBottom: '1rem',
    background: 'hsla(0deg, 0%, 90%, 0.2)',
  },
  '.yozora-heading': {
    '.yozora-inline-math': {
      color: 'inherit',
    },
    '.yozora-math': {
      color: 'inherit',
    },
  },
})

function useSmallScreenStyle(): string {
  const { xsMinus } = useThemeContext().breakpoints
  return React.useMemo<string>(
    () =>
      css({
        [`@media screen and ${xsMinus}`]: {
          [CommonTokenNames.fontSizeCode]: '12px',
          [CommonTokenNames.lineHeightCode]: 'calc(12px * 1.6)',
          '.yozora-code-highlighter__linenos': {
            display: 'none',
            visibility: 'hidden',
          },
          '.yozora-code-literal': {
            border: 'none',
            borderRadius: '5px',
            boxShadow: 'rgba(30, 30, 30, 73%) 0 2px 10px',
            overflow: 'hidden',
            '.yozora-list-item': {
              '> .yozora-paragraph:last-child': {
                marginBottom: '0.5rem',
              },
            },
            '.yozora-paragraph': {
              '+ .yozora-math': {
                marginTop: '-1rem',
              },
              '+ .yozora-list': {
                marginTop: '-0.8rem',
              },
            },
          },
          '.yozora-code-live': {
            border: 'none',
            borderRadius: '5px',
            boxShadow: 'rgba(30, 30, 30, 73%) 0 2px 10px',
            overflow: 'hidden',
            '.yozora-code-highlighter__linenos': {
              display: 'none',
              visibility: 'hidden',
            },
          },
          '.yozora-inline-math': {
            fontSize: '0.9rem',
          },
          '.yozora-math': {
            fontSize: '0.9rem',
          },
          '.yozora-paragraph': {
            letterSpacing: 0,
            lineHeight: 1.6,
          },
        },
      }),
    [xsMinus],
  )
}
