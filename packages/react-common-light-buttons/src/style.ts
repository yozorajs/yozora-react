import { css } from '@emotion/css'

export const classes = {
  container: css({
    userSelect: 'none',
  }),
  lightBtn: css({
    display: 'inline-block',
    boxSizing: 'border-box',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    marginLeft: '8px',
  }),
  lightBtnClose: css({
    backgroundColor: '#ed6c60',
  }),
  lightBtnMinimize: css({
    backgroundColor: '#f7c151',
  }),
  lightBtnMaximize: css({
    backgroundColor: '#64c856',
  }),
}
