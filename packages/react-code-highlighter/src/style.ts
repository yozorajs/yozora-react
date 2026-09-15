import { CommonTokenNames, TokenNames } from '@yozora/react-core'

export const vars = {
  border: `1px solid var(${TokenNames.colorBorderCodeLineno}, hsla(0deg, 0%, 80%, 0.8))`,
  highlightBackground: `var(${TokenNames.colorBgCodeHighlight}, rgba(59, 130, 246, 0.09))`,
  fontSizeCode: `var(${CommonTokenNames.fontSizeCode}, 14px)`,
  lineHeightCode: `var(${CommonTokenNames.lineHeightCode}, 1.6)`,
}

export const classes = {
  container: 'yozora-code-highlighter__container',
  line: 'yozora-code-highlighter__line',
  linenoLine: 'yozora-code-highlighter__lineno-line',
  highlightLine: 'yozora-code-highlighter__highlight-line',
  lineno: 'yozora-code-highlighter__linenos',
  codes: 'yozora-code-highlighter__codes',
  codeWrapper: 'yozora-code-highlighter__code-wrapper',
  codeLine: 'yozora-code-highlighter__code-line',
}
