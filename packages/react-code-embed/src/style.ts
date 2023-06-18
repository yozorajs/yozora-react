import { css } from '@emotion/css'
import { TokenNames } from '@yozora/core-react-theme'

const vars = {
  border: `1px solid var(${TokenNames.colorBorderError}, red)`,
  errorColor: `var(${TokenNames.colorBorderError}, red)`,
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
