import { css, cx } from '@emotion/css'
import { CommonTokenNames, TokenNames } from '@yozora/core-react-theme'

const vars = {
  border: `1px solid var(${TokenNames.colorBorderCode}, #d3d3d3)`,
  caretColor: `var(${TokenNames.colorCodeCaret}, #ed6c60)`,
  codeFontFamily: `var(${CommonTokenNames.fontFamilyCode}, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
  codeFontSize: `var(${CommonTokenNames.fontSizeCode}, 1rem)`,
  lineHeightCode: `var(${CommonTokenNames.lineHeightCode}, 1.6)`,
}

const baseEditorAreaCls: string = css({
  height: '100%',
  width: '100%',
  padding: 0,
  border: 0,
  margin: 0,
  outline: 'none',
  background: 'none',
  boxSizing: 'inherit',
  display: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontVariantLigatures: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',
  lineHeight: 'inherit',
  overflowWrap: 'inherit',
  tabSize: 'inherit',
  textIndent: 'inherit',
  textRendering: 'inherit',
  textTransform: 'inherit',
  whiteSpace: 'inherit',
  wordBreak: 'inherit',
  wordSpacing: 'inherit',
  wordWrap: 'inherit',
})

const textareaCls: string = cx(
  baseEditorAreaCls,
  css({
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }),
)

const textareaContentsCls: string = cx(
  baseEditorAreaCls,
  css({
    flex: '1 1 auto',
    resize: 'none',
    padding: 0,
    color: 'transparent',
    caretColor: vars.caretColor,
    WebkitTextFillColor: 'transparent',
    // Reset the text fill color so that placeholder is visible
    '&:empty': {
      color: 'inherit',
      WebkitTextFillColor: 'inherit',
    },
  }),
)

export const classes = {
  container: css({
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: 0,
    textAlign: 'left',
    tabSize: 2,
    fontSmooth: 'always',
    whiteSpace: 'pre',
    wordBreak: 'keep-all',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    lineHeight: vars.lineHeightCode,

    // Patching styles.
    fontFamily: vars.codeFontFamily,
    fontSize: vars.codeFontSize,
    border: vars.border,
    borderRadius: '4px',
    '& > pre': {
      code: {
        padding: 0,
        margin: 0,
        lineHeight: 'inherit',
        background: 'transparent',
      },
      span: {
        lineHeight: 'inherit',
      },
    },
    [`.${textareaContentsCls}`]: {
      overflowX: 'hidden',
    },
  }),
  textarea: textareaCls,
  textareaContents: textareaContentsCls,
  textareaLinenos: css({
    flex: '0 0 auto',
  }),
  previewer: cx(
    baseEditorAreaCls,
    css({
      position: 'relative',
      pointerEvents: 'none',
    }),
  ),
}
