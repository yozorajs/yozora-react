import { css } from '@emotion/css'

const vars = {
  border: 'var(--yozora-admonition-border-width, 5px) solid transparent',
  noteBorderColor: 'var(--yozora-colors-border-note, #d4d5d8)',
  noteBackground: 'var(--yozora-colors-background-note, #fdfdfe)',
  infoBorderColor: 'var(--yozora-colors-border-info, #4cb3d4)',
  infoBackground: 'var(--yozora-colors-background-info, #eef9fd)',
  tipBorderColor: 'var(--yozora-colors-border-success, #009400)',
  tipBackground: 'var(--yozora-colors-background-success, #e6f6e6)',
  cautionBorderColor: 'var(--yozora-colors-border-warning, #e6a700)',
  cautionBackground: 'var(--yozora-colors-background-warning, #fff8e6)',
  dangerBorderColor: 'var(--yozora-colors-border-error, #e13238)',
  dangerBackground: 'var(--yozora-colors-background-error, #ffebec)',
}

const headingCls: string = css({
  display: 'flex',
  alignItems: 'flex-start',
  lineHeight: 1.6,
  fontSize: '0.857rem',
  margin: '0 0 8px 0',
  verticalAlign: 'middle',
  letterSpacing: '1px',
  textRendering: 'optimizeLegibility',
  textSizeAdjust: '100%',
  textTransform: 'none',
  overflowWrap: 'break-word',
  fontFamily: `system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif`,
})

export const classes = {
  container: css({
    padding: '1em',
    borderLeft: vars.border,
    borderRadius: '6px',
    margin: '0 0 1.25em 0',
    boxShadow: '0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1)',
    '&&[data-admonition-keyword="note"]': {
      borderColor: vars.noteBorderColor,
      backgroundColor: vars.noteBackground,
      [`.${headingCls}`]: {
        color: vars.noteBorderColor,
      },
    },
    '&&[data-admonition-keyword="info"]': {
      borderColor: vars.infoBorderColor,
      backgroundColor: vars.infoBackground,
      [`.${headingCls}`]: {
        color: vars.infoBorderColor,
      },
    },
    '&&[data-admonition-keyword="tip"]': {
      borderColor: vars.tipBorderColor,
      backgroundColor: vars.tipBackground,
      [`.${headingCls}`]: {
        color: vars.tipBorderColor,
      },
    },
    '&&[data-admonition-keyword="caution"]': {
      borderColor: vars.cautionBorderColor,
      backgroundColor: vars.cautionBackground,
      [`.${headingCls}`]: {
        color: vars.cautionBorderColor,
      },
    },
    '&&[data-admonition-keyword="danger"]': {
      borderColor: vars.dangerBorderColor,
      backgroundColor: vars.dangerBackground,
      [`.${headingCls}`]: {
        color: vars.dangerBorderColor,
      },
    },
  }),
  heading: headingCls,
  icon: css({
    marginRight: '0.5rem',
    '> svg:first-child path': {
      fill: 'currentColor',
    },
  }),

  title: css({
    display: 'block',
  }),
}
