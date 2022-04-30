import CodeHighlighter from '@yozora/react-code-highlighter'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import type { ICodeLiteralProps } from './types'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export const CodeLiteral: React.FC<ICodeLiteralProps> = props => {
  const { value, lang, title, highlightLinenos, maxLines, showLineNo, darken, className, style } =
    props

  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed ?? false)
  const [countOfLines, setCountOfLines] = useState<number | null>(() =>
    collapsed ? value.split(/\r|\n|\n\r/g).length : null,
  )

  useEffect(() => {
    if (countOfLines != null || !collapsed) return
    setCountOfLines(value.split(/\r|\n|\n\r/g).length)
  }, [collapsed, countOfLines, value])

  return (
    <div className={cn('yozora-code-literal', className)} style={style}>
      <div
        key="toolbar"
        className="yozora-code-literal__toolbar"
        onDoubleClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setCollapsed(v => !v)
        }}
      >
        <LightButtons
          key="light-buttons"
          onMinimize={() => setCollapsed(true)}
          onMaximize={() => setCollapsed(false)}
        />
        <span key="title" className="yozora-code-literal__title" title={title}>
          {title}&nbsp;
          {title && countOfLines && ' | ' + countOfLines + ' lines.'}
        </span>
        <span
          key="copy-btn"
          className="yozora-code-literal__copy-button"
          onClick={e => e.stopPropagation()}
        >
          <CopyButton value={value} />
        </span>
      </div>
      <code key="content" className="yozora-code-literal__content">
        <pre>
          <CodeHighlighter
            lang={lang}
            value={value}
            highlightLinenos={highlightLinenos}
            maxLines={maxLines}
            collapsed={collapsed}
            showLineNo={showLineNo}
            darken={darken}
          />
        </pre>
      </code>
    </div>
  )
}

CodeLiteral.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  darken: PropTypes.bool,
  highlightLinenos: PropTypes.array,
  lang: PropTypes.string,
  maxLines: PropTypes.number,
  showLineNo: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
}

CodeLiteral.displayName = 'YozoraCodeLiteral'
export default CodeLiteral