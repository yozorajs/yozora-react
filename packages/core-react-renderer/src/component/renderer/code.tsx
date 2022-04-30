import type { Code } from '@yozora/ast'
import { YozoraThemeContextType } from '@yozora/core-react-theme'
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
  const { lang, meta } = props
  const { theme, preference } = React.useContext(YozoraThemeContextType)

  // Remove trailing line endings.
  const value: string = props.value.replace(/[\r\n]+$/, '')
  const metaData = parseCodeMeta(meta ?? '', { preferLineNo: preference.showCodeLineNo })
  const darken: boolean = theme === 'darken'

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
