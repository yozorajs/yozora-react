import { css } from '@emotion/css'

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
    color: 'var(--yozora-colors-border-error, red)',
    border: '1px solid var(--yozora-colors-border-error, red)',
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
