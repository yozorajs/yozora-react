import CodeHighlighter from '@yozora/react-code-highlighter'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
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

  return (
    <Container className={cn('yozora-code-literal', className)} style={style}>
      <div key="toolbar" className="yozora-code-literal__toolbar">
        <LightButtons
          key="light-buttons"
          onMinimize={() => setCollapsed(true)}
          onMaximize={() => setCollapsed(false)}
        />
        <span key="title" className="yozora-code-literal__title" title={title}>
          {title}
        </span>
        <span key="copy-btn" className="yozora-code-literal__copy-button">
          <CopyButton value={value} />
        </span>
      </div>
      <code>
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
