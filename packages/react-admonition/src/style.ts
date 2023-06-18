import { css } from '@emotion/css'
import { TokenNames } from '@yozora/core-react-theme'

const vars = {
  border: '5px solid transparent',
  cautionBackground: `var(${TokenNames.colorBgWarning}, #fff8e6)`,
  dangerBackground: `var(${TokenNames.colorBgError}, #ffebec)`,
  infoBackground: `var(${TokenNames.colorBgInfo}, #eef9fd)`,
  noteBackground: `var(${TokenNames.colorBgNote}, #fdfdfe)`,
  tipBackground: `var(${TokenNames.colorBgSuccess}, #e6f6e6)`,
  cautionBorderColor: `var(${TokenNames.colorBorderWarning}, #e6a700)`,
  dangerBorderColor: `var(${TokenNames.colorBorderError}, #e13238)`,
  infoBorderColor: `var(${TokenNames.colorBorderInfo}, #4cb3d4)`,
  noteBorderColor: `var(${TokenNames.colorBorderNote}, #d4d5d8)`,
  tipBorderColor: `var(${TokenNames.colorBorderSuccess}, #009400)`,
  cautionTextColor: `var(${TokenNames.colorWarning}, #4d3800)`,
  dangerTextColor: `var(${TokenNames.colorError}, #4d3800)`,
  infoTextColor: `var(${TokenNames.colorInfo}, #4d3800)`,
  noteTextColor: `var(${TokenNames.colorNote}, #4d3800)`,
  tipTextColor: `var(${TokenNames.colorSuccess}, #4d3800)`,
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
