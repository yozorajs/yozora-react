import { css } from '@emotion/css'

const vars = {
  border: '1px solid var(--yozora-colors-border-error, red)',
  errorColor: 'var(--yozora-colors-border-error, red)',
}

export const classes = {
  container: css({
    position: 'relative',
    border: 'none',
    padding: 0,
    background: 'transparent',
  }),
  error: css({
    display: 'block',
    width: '100%',
    height: '100%',
    color: vars.errorColor,
    border: vars.border,
  }),
  errorDetails: css({
    display: 'block',
    width: '100%',
    minHeight: '100%',
    padding: '0.5rem',
    background: 'transparent',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  }),
}
