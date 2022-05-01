import { css } from '@emotion/css'

const copyBtn: string = css({
  position: 'absolute',
  right: '1rem',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  background: 'var(--yozora-colors-background-code, #f5f5f5)',
  userSelect: 'none',
})

export const classes = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: '1px solid #d3d3d3',
    borderColor: 'var(--yozora-colors-border-code)',
    background: 'var(--yozora-colors-background-code, #f5f5f5)',
    caretColor: 'var(--yozora-colors-caret-code, #ed6c60)',
    '&:hover': {
      [`.${copyBtn}`]: {
        visibility: 'visible',
        opacity: 1,
      },
    },
  }),
  toolbar: css({
    flex: '0 0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '2rem',
    width: '100%',
    borderBottom: '1px solid hsla(0deg, 0%, 80%, 0.8)',
    borderColor: 'var(--yozora-colors-border-code)',
    cursor: 'default',
  }),
  title: css({
    marginLeft: '1rem',
    fontFamily: `var(--yozora-fonts-family-heading, 'Comic Sans MS', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif)`,
    fontSize: '0.9em',
    color: 'var(--yozora-colors-text-codeTitle, hsla(0deg, 0%, 30%, 0.8))',
    userSelect: 'none',
  }),
  content: css({
    overflow: 'auto',
    padding: 0,
    border: 'none',
    margin: 0,
    fontFamily: `var(--yozora-fonts-family-code, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
    fontSize: 'var(--yozora-fonts-size-code, 1rem)',
    background: 'var(--yozora-colors-background-code, #f5f5f5)',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordSpacing: 'normal',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    letterSpacing: 1,
    lineHeight: 'inherit',
    tabSize: 2,
    '> pre': {
      margin: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '&::selection': {
        background: 'var(--yozora-colors-selection-code, hsla(200deg, 30%, 70%, 0.3))',
      },
    },
    span: {
      lineHeight: 'inherit',
    },
    code: {
      padding: 0,
      margin: 0,
      lineHeight: 'inherit',
      background: 'transparent',
    },
    '::selection': {
      background: 'var(--yozora-colors-selection-code, hsla(200deg, 30%, 70%, 0.3))',
    },
  }),
  copyBtn,
}
