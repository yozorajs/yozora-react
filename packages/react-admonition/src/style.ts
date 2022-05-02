import { css } from '@emotion/css'

const vars = {
  border: '5px solid transparent',
  cautionBackground: 'var(--yozora-colors-background-warning, #fff8e6)',
  dangerBackground: 'var(--yozora-colors-background-error, #ffebec)',
  infoBackground: 'var(--yozora-colors-background-info, #eef9fd)',
  noteBackground: 'var(--yozora-colors-background-note, #fdfdfe)',
  tipBackground: 'var(--yozora-colors-background-success, #e6f6e6)',
  cautionBorderColor: 'var(--yozora-colors-border-warning, #e6a700)',
  dangerBorderColor: 'var(--yozora-colors-border-error, #e13238)',
  infoBorderColor: 'var(--yozora-colors-border-info, #4cb3d4)',
  noteBorderColor: 'var(--yozora-colors-border-note, #d4d5d8)',
  tipBorderColor: 'var(--yozora-colors-border-success, #009400)',
  cautionTextColor: 'var(--yozora-colors-text-warning, #4d3800)',
  dangerTextColor: 'var(--yozora-colors-text-error, #4d3800)',
  infoTextColor: 'var(--yozora-colors-text-info, #4d3800)',
  noteTextColor: 'var(--yozora-colors-text-note, #4d3800)',
  tipTextColor: 'var(--yozora-colors-text-success, #4d3800)',
}

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
      color: vars.noteTextColor,
    },
    '&&[data-admonition-keyword="info"]': {
      borderColor: vars.infoBorderColor,
      backgroundColor: vars.infoBackground,
      color: vars.infoTextColor,
    },
    '&&[data-admonition-keyword="tip"]': {
      borderColor: vars.tipBorderColor,
      backgroundColor: vars.tipBackground,
      color: vars.tipTextColor,
    },
    '&&[data-admonition-keyword="caution"]': {
      borderColor: vars.cautionBorderColor,
      backgroundColor: vars.cautionBackground,
      color: vars.cautionTextColor,
    },
    '&&[data-admonition-keyword="danger"]': {
      borderColor: vars.dangerBorderColor,
      backgroundColor: vars.dangerBackground,
      color: vars.dangerTextColor,
    },
  }),
  heading: css({
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
  }),
  body: css({}),
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
