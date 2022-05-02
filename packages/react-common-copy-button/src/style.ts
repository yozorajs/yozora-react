import { css } from '@emotion/css'

export const classes = {
  container: css({
    display: 'inline-block',
    padding: '0.4rem',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    color: 'var(--yozora-copy-button--waiting, #73808c)',
    '&:hover': {
      color: 'var(--yozora-copy-button--hover, #94b3d1)',
    },
    '&:active': {
      color: 'var(--yozora-copy-button--active, #7099c2)',
    },
    '&[data-copy-status="copying"]': {
      color: 'var(--yozora-copy-button--copying, #cccccc)',
    },
    '&[data-copy-status="failed"]': {
      color: 'var(--yozora-copy-button--failed, #b81414)',
    },
    '&[data-copy-status="succeed"]': {
      color: 'var(--yozora-copy-button--succeed, #14b814)',
    },
  }),
}
