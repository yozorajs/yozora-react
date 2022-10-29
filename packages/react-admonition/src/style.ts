import { css } from '@emotion/css'

const vars = {
  border: '5px solid transparent',
  cautionBackground: 'var(--color-bg-warning, #fff8e6)',
  dangerBackground: 'var(--color-bg-error, #ffebec)',
  infoBackground: 'var(--color-bg-info, #eef9fd)',
  noteBackground: 'var(--color-bg-note, #fdfdfe)',
  tipBackground: 'var(--color-bg-success, #e6f6e6)',
  cautionBorderColor: 'var(--color-border-warning, #e6a700)',
  dangerBorderColor: 'var(--color-border-error, #e13238)',
  infoBorderColor: 'var(--color-border-info, #4cb3d4)',
  noteBorderColor: 'var(--color-border-note, #d4d5d8)',
  tipBorderColor: 'var(--color-border-success, #009400)',
  cautionTextColor: 'var(--color-warning, #4d3800)',
  dangerTextColor: 'var(--color-error, #4d3800)',
  infoTextColor: 'var(--color-info, #4d3800)',
  noteTextColor: 'var(--color-note, #4d3800)',
  tipTextColor: 'var(--color-success, #4d3800)',
}

const heading: string = css({
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
      color: vars.noteTextColor,
      [`.${heading}`]: {
        color: vars.noteBorderColor,
      },
    },
    '&&[data-admonition-keyword="info"]': {
      borderColor: vars.infoBorderColor,
      backgroundColor: vars.infoBackground,
      color: vars.infoTextColor,
      [`.${heading}`]: {
        color: vars.infoBorderColor,
      },
    },
    '&&[data-admonition-keyword="tip"]': {
      borderColor: vars.tipBorderColor,
      backgroundColor: vars.tipBackground,
      color: vars.tipTextColor,
      [`.${heading}`]: {
        color: vars.tipBorderColor,
      },
    },
    '&&[data-admonition-keyword="caution"]': {
      borderColor: vars.cautionBorderColor,
      backgroundColor: vars.cautionBackground,
      color: vars.cautionTextColor,
      [`.${heading}`]: {
        color: vars.cautionBorderColor,
      },
    },
    '&&[data-admonition-keyword="danger"]': {
      borderColor: vars.dangerBorderColor,
      backgroundColor: vars.dangerBackground,
      color: vars.dangerTextColor,
      [`.${heading}`]: {
        color: vars.dangerBorderColor,
      },
    },
  }),
  heading,
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
