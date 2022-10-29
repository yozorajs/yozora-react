import { css, cx } from '@emotion/css'
import { useDeepCompareMemo } from '@yozora/core-react-hook'
import { useThemeContext } from '@yozora/core-react-theme'

export const useStyles = (): string => {
  const { breakpoints } = useThemeContext().themeStyles
  return useDeepCompareMemo<string>(() => {
    return cx(
      basicStyle,
      patchStyle,
      // Adaptive small screen.
      css({
        [`@media screen and ${breakpoints.xs.exactOrMinus}`]: {
          '.yozora-code-literal': {
            border: 'none',
            borderRadius: '5px',
            boxShadow: 'rgba(30, 30, 30, 73%) 0 2px 10px',
            overflow: 'hidden',
            '.yozora-code-highlighter': {
              fontSize: '0.9rem',
            },
            '.yozora-code-highlighter__content': {
              fontSize: '0.9rem',
            },
            '.yozora-code-highlighter__linenos': {
              display: 'none',
              visibility: 'hidden',
            },
            '.yozora-code-editor__textarea': {
              fontSize: '0.9rem',
            },
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
            '.yozora-code-highlighter': {
              fontSize: '0.9rem',
            },
            '.yozora-code-highlighter__content': {
              fontSize: '0.9rem',
            },
            '.yozora-code-highlighter__linenos': {
              display: 'none',
              visibility: 'hidden',
            },
            '.yozora-code-editor__textarea': {
              fontSize: '0.9rem',
            },
          },
          '.yozora-inline-math': {
            fontSize: '0.9rem',
          },
          '.yozora-math': {
            fontSize: '0.9rem',
          },
        },
      }),
    )
  }, [breakpoints])
}

const basicStyle: string = css({
  '.yozora-markdown': {
    fontFamily: 'var(--font-family-body)',
    background: 'var(--color-bg-body)',
    color: 'var(--color-body)',
    wordBreak: 'break-all',
    userSelect: 'unset',
  },

  '.yozora-admonition.yozora-admonition': {
    margin: 'var(--spacing-margin-blockNode)',
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
        color: 'var(--active-color-link)',
      },
      '&:hover': {
        color: 'var(--hover-color-link)',
        letterSpacing: '2px',
        transform: 'scale(1.2)',
      },
      '&:visited': {
        color: 'var(--visited-color-link)',
      },
    },
  },
  '.yozora-inline-math': {
    padding: 0,
    border: 'none',
    margin: 0,
    background: 'transparent',
    color: 'var(--color-math)',
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
          backgroundColor: 'var(--color-border-info)',
          width: '0.4rem',
          height: '0.4rem',
        },
        '&[data-status="done"]': {
          backgroundColor: 'var(--color-border-info)',
          borderColor: 'var(--color-border-info)',
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
    display: 'block',
    overflow: 'visible',
    border: 'none',
    margin: '0 0 1em',
    background: 'transparent',
    color: 'var(--color-math)',
    '> mjx-container': {
      margin: '0 !important',
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
