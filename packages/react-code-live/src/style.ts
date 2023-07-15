import { css } from '@emotion/css'
import { CommonTokenNames, TokenNames } from '@yozora/core-react-theme'

const vars = {
  border: `1px solid var(${TokenNames.colorBorderCode}, #d3d3d3)`,
  background: `var(${TokenNames.colorBgCode}, #f5f5f5)`,
  caretColor: `var(${TokenNames.colorCodeCaret}, #ed6c60)`,
  codeFontFamily: `var(${CommonTokenNames.fontFamilyCode}, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
  codeFontSize: `var(${CommonTokenNames.fontSizeCode}, 1rem)`,
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

const editorCls: string = css({
  flex: '1 1 0%',
  position: 'relative',
  boxSizing: 'border-box',
  overflow: 'auto',
  padding: 0,
  margin: 0,
  fontFamily: vars.codeFontFamily,
  fontSize: vars.codeFontSize,
  background: 'none',
  '&& ::selection': {
    background: vars.selectionBackground,
  },
  '.yozora-code-editor': {
    border: 'none',
    borderRadius: 0,
  },
})

const previewerCls: string = css({
  flex: '1 1 0%',
  boxSizing: 'border-box',
  overflow: 'auto',
  display: 'block',
  padding: 0,
  margin: 0,
  color: '#000',
  background: 'none',
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
    '&& ::selection': {
      background: vars.selectionBackground,
    },
    '&& ::-webkit-scrollbar': {
      height: 4,
      width: 4,
    },
    '&& ::-webkit-scrollbar-track': {
      background: 'transparent',
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
    background: vars.background,
    cursor: 'default',
  }),
  title: css({
    marginLeft: '1rem',
    fontFamily: vars.titleFontFamily,
    fontSize: '0.9em',
    color: vars.titleFontColor,
    userSelect: 'none',
  }),
  main: css({
    flex: '1 1 auto',
    // To avoid the main container overflow at the y-axis, flex-basis will never
    // be shrink shorter less than the min-height (the default value of
    // min-height is *auto*).
    // By the way, set *height: 0px;* also works.
    minHeight: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    [`.${editorCls}`]: {
      borderRight: vars.border,
    },
  }),
  mainVertical: css({
    flexDirection: 'column',
    [`.${editorCls}`]: {
      flex: '0 1 auto',
      borderBottom: vars.border,
      borderRight: 'none',
    },
    [`.${previewerCls}`]: {
      flex: '1 0 auto',
    },
  }),
  editor: editorCls,
  previewer: previewerCls,
  previewerCenter: css({
    '> .yozora-code-embed': {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  copyBtn: copyBtnCls,
}
