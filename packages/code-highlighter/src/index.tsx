import type { PrismTheme } from 'prism-react-renderer'
import Highlight, { Prism } from 'prism-react-renderer'
import React, { useMemo } from 'react'
import HighlighterContent from './content'
import vscDarkTheme from './theme/vsc-dark'
import vscLightTheme from './theme/vsc-light'

/**
 * Enable more prism language support.
 * @see https://github.com/FormidableLabs/prism-react-renderer#faq
 */
function enablePrismLanguages(): void {
  const self: any = typeof global !== 'undefined' ? global : window
  self.Prism = Prism
  require('prismjs/components/prism-visual-basic')
}
enablePrismLanguages()

export { vscDarkTheme } from './theme/vsc-dark'
export { vscLightTheme } from './theme/vsc-light'

export interface CodeHighlighterProps {
  /**
   * Source code contents
   */
  value: string
  /**
   * Code language
   */
  lang?: string
  /**
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   * @default true
   */
  darken?: boolean
  /**
   * Highlight prism theme.
   */
  theme?: PrismTheme
}

/**
 * @param props
 * @returns
 */
export function CodeHighlighter(
  props: CodeHighlighterProps,
): React.ReactElement {
  const { lang, value: code, darken = true } = props

  const theme: PrismTheme =
    props.theme == null ? (darken ? vscDarkTheme : vscLightTheme) : props.theme

  const result = useMemo<React.ReactElement>(() => {
    return (
      <Highlight Prism={Prism} code={code} theme={theme} language={lang as any}>
        {innerProps => <HighlighterContent {...innerProps} />}
      </Highlight>
    )
  }, [code, theme, lang])
  return result
}

CodeHighlighter.displayName = 'YozoraCodeHighlighter'
export default CodeHighlighter
