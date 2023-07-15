import { css } from '@emotion/css'
import { CopyStatus } from './constant'

const vars = {
  colorPending: `var(--yozora-copy-button--${CopyStatus.PENDING}, #73808c)`,
  colorCopying: `var(--yozora-copy-button--${CopyStatus.COPYING}, #cccccc)`,
  colorCompleted: `var(--yozora-copy-button--${CopyStatus.COMPLETED}, #14b814)`,
  colorFailed: `var(--yozora-copy-button--${CopyStatus.FAILED}, #b81414)`,
  colorActive: 'var(--yozora-copy-button--active, #7099c2)',
  colorHover: 'var(--yozora-copy-button--hover, #94b3d1)',
}

export const classes = {
  container: css({
    padding: '6px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    userSelect: 'none',
    color: vars.colorPending,
    '&&:hover': {
      color: vars.colorActive,
      border: 'none',
      outline: 'none',
    },
    '&:active': {
      color: vars.colorActive,
      border: 'none',
      outline: 'none',
    },
    '&:target': {
      border: 'none',
      outline: 'none',
      animation: 'none',
    },
    [`&[data-copy-status="${CopyStatus.COPYING}"]`]: {
      color: vars.colorCopying,
    },
    [`&[data-copy-status="${CopyStatus.COMPLETED}"]`]: {
      color: vars.colorCompleted,
    },
    [`&[data-copy-status="${CopyStatus.FAILED}"]`]: {
      color: vars.colorFailed,
    },
  }),
}
