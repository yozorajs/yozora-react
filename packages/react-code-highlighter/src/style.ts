import { css } from '@emotion/css'

const vars = {
  border: '1px solid var(--color-border-codeLineno, hsla(0deg, 0%, 80%, 0.8))',
  highlightBackground: 'var(--color-bg-codeHighlight, hsla(30deg, 90%, 50%, 0.3))',
}

export const classes = {
  container: css({
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    display: 'flex',
    alignItems: 'stretch',
    overflow: 'hidden',
    width: '100%',
    padding: 0,
    transition: 'max-height 0.5s ease-in-out',
    tabSize: 2,
    fontSmooth: 'always',
    whiteSpace: 'pre',
    wordBreak: 'keep-all',
    wordSpacing: 'normal',
    wordWrap: 'normal',
  }),
  line: css({
    boxSizing: 'border-box',
    display: 'block',
    minWidth: 'fit-content',
    width: '100%',
    padding: '0 6px',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
    overflowWrap: 'inherit',
    tabSize: 'inherit',
    textIndent: 'inherit',
    textRendering: 'inherit',
    textTransform: 'inherit',
    whiteSpace: 'inherit',
    wordBreak: 'inherit',
    wordSpacing: 'inherit',
    wordWrap: 'inherit',
  }),
  highlightLine: css({
    background: vars.highlightBackground,
    borderColor: 'transparent',
  }),
  lineno: css({
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: '0.5rem 0',
    cursor: 'default',
    userSelect: 'none',
    textAlign: 'right',
    borderRight: vars.border,
  }),
  codes: css({
    flex: '1 1 auto',
    overflow: 'overlay',
    boxSizing: 'border-box',
    padding: '0.5rem 0',
  }),
  codeWrapper: css({
    minWidth: '100%',
    width: 'fit-content',
  }),
  codeLine: css({
    padding: '0 1rem 0 12px',
  }),
}
