import CodeHighlighter from '@yozora/react-code-highlighter'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Container } from './style'
import type { CodeLiteralProps } from './types'

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
export function CodeLiteral(props: CodeLiteralProps): React.ReactElement {
  const {
    value,
    lang,
    title,
    highlightLinenos,
    maxLines,
    collapsed: _collapsed = false,
    className,
    style,
  } = props

  const [collapsed, setCollapsed] = useState<boolean>(_collapsed)
  const [countOfLines, setCountOfLines] = useState<number | null>(() =>
    collapsed ? value.split(/\r|\n|\n\r/g).length : null,
  )

  useEffect(() => {
    if (countOfLines != null || !collapsed) return
    setCountOfLines(value.split(/\r|\n|\n\r/g).length)
  }, [collapsed])

  return (
    <Container className={cn('yozora-code-literal', className)} style={style}>
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
          {title}{' '}
          {title &&
            collapsed &&
            countOfLines &&
            ' | ' + countOfLines + ' lines.'}
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
          />
        </pre>
      </code>
    </Container>
  )
}

CodeLiteral.displayName = 'YozoraCodeLiteral'
CodeLiteral.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string,
  title: PropTypes.string,
  highlightLinenos: PropTypes.array,
  maxLines: PropTypes.number,
  collapsed: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}
