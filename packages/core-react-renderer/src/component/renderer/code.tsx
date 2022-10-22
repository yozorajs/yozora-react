/* eslint-disable react/prop-types */
import type { Code } from '@yozora/ast'
import type { IThemePreference } from '@yozora/core-react-theme'
import { Theme, ThemeContextType } from '@yozora/core-react-theme'
import CodeHighlighter from '@yozora/react-code-highlighter'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { parseCodeMeta } from '../../util/code'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 */
export const CodeRenderer: INodeRenderer<Code> = props => {
  const { lang, meta, value } = props
  const { theme, preference } = React.useContext(ThemeContextType)
  return (
    <CodeRendererInner
      lang={lang}
      meta={meta}
      value={value}
      theme={theme}
      preference={preference}
    />
  )
}

class CodeRendererInner extends React.PureComponent<{
  lang: string | null
  meta: string | null
  value: string
  theme: Theme
  preference: IThemePreference
}> {
  public override render(): React.ReactElement {
    const { lang, meta, theme, preference } = this.props

    // Remove trailing line endings.
    const value: string = this.props.value.replace(/[\r\n]+$/, '')
    const metaData = parseCodeMeta(meta ?? '', { preferLineNo: preference.showCodeLineNo })
    const darken: boolean = theme === Theme.DARKEN

    return (
      <code className="yozora-code">
        <pre>
          <CodeHighlighter
            lang={lang}
            value={value}
            highlightLinenos={metaData.highlights}
            maxLines={metaData.maxlines}
            collapsed={metaData.collapsed}
            showLineNo={metaData.showlineno}
            darken={darken}
          />
        </pre>
      </code>
    )
  }
}
