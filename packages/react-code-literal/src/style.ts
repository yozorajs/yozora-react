import { css } from '@emotion/css'
import { CommonTokenNames, TokenNames } from '@yozora/core-react-constant'

const vars = {
  border: `1px solid var(${TokenNames.colorBorderCode}, #d3d3d3)`,
  background: `var(${TokenNames.colorBgCode}, #f5f5f5)`,
  caretColor: `var(${TokenNames.colorCodeCaret}, #ed6c60)`,
  fontFamilyCode: `var(${CommonTokenNames.fontFamilyCode}, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
  fontSizeCode: `var(${CommonTokenNames.fontSizeCode}, 1rem)`,
  selectionBackground: `var(${TokenNames.colorCodeSelection}, hsla(200deg, 30%, 70%, 0.3))`,
  titleFontFamily: `var(${CommonTokenNames.fontFamilyHeading}, 'Comic Sans MS', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif)`,
  titleFontColor: `var(${TokenNames.colorCodeTitle}, hsla(0deg, 0%, 30%, 0.8))`,
}

const copyBtnCls: string = css({
  position: 'absolute',
  right: '1rem',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  background: 'none',
  userSelect: 'none',
})

export const classes = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: vars.border,
    background: vars.background,
    caretColor: vars.caretColor,
    '&&:hover': {
      [`.${copyBtnCls}`]: {
        visibility: 'visible',
        opacity: 1,
      },
    },
  }),
  toolbar: css({
    flex: '0 0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '2rem',
    width: '100%',
    borderBottom: vars.border,
    background: 'none',
    cursor: 'default',
  }),
  title: css({
    marginLeft: '1rem',
    fontFamily: vars.titleFontFamily,
    fontSize: vars.fontSizeCode,
    color: vars.titleFontColor,
    userSelect: 'none',
  }),
  content: css({
    overflow: 'auto',
    padding: 0,
    border: 'none',
    margin: 0,
    fontFamily: vars.fontFamilyCode,
    fontSize: vars.fontSizeCode,
    background: 'inherit',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordSpacing: 'normal',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    letterSpacing: 1,
    lineHeight: 'inherit',
    tabSize: 2,
    '> pre': {
      margin: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '&&::selection': {
        background: vars.selectionBackground,
      },
    },
    span: {
      lineHeight: 'inherit',
    },
    code: {
      padding: 0,
      margin: 0,
      lineHeight: 'inherit',
      background: 'none',
    },
    '&& ::selection': {
      background: vars.selectionBackground,
    },
  }),
  copyBtn: copyBtnCls,
}
