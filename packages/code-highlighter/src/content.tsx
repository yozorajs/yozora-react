import cn from 'clsx'
import React, { useEffect } from 'react'
import { Container } from './style'
import { calcHeight } from './util'
import type { HighlightContentProps } from './types'

/**
 * Content of CodeHighlighter.
 */
export function HighlighterContent(
  props: HighlightContentProps,
): React.ReactElement {
  const {
    contentRef,
    codesRef,
    highlightLinenos = [],
    collapsed = false,
    maxLines = -1,
    lineHeight = '1.8rem',
    showLinenos = true,
    tokens,
    getLineProps,
    getTokenProps,
    onLinenoWidthChange,
    className,
    style: _style,
  } = props

  const linenoWidth = showLinenos
    ? `${Math.max(2, ('' + tokens.length).length) * 1.1}em`
    : undefined

  useEffect(() => {
    if (onLinenoWidthChange == null) return
    onLinenoWidthChange(linenoWidth)
  }, [linenoWidth, onLinenoWidthChange])

  // Sync lineno width.
  const style: React.CSSProperties = { ..._style, lineHeight, maxHeight: 0 }
  if (!collapsed) {
    const countOfLines = maxLines > 0 ? maxLines : tokens.length
    const maxHeight = calcHeight(lineHeight, countOfLines + 0.5)
    style.maxHeight = maxHeight
    style.minHeight = '100%'
  }

  return (
    <Container ref={contentRef} className={className} style={style}>
      {showLinenos && (
        <div
          key="linenos"
          className="yozora-code-highlighter__linenos"
          style={{ width: linenoWidth }}
        >
          {tokens.map((_, lineNo) => {
            const isHighlight = highlightLinenos.includes(lineNo + 1)
            return (
              <div
                key={lineNo}
                className={cn('yozora-code-highlighter__line', {
                  'yozora-code-highlighter__line--highlight': isHighlight,
                })}
              >
                <span key={lineNo}>{lineNo + 1}</span>
              </div>
            )
          })}
        </div>
      )}
      <div
        ref={codesRef}
        key="codes"
        className="yozora-code-highlighter__codes"
      >
        {tokens.map((line, lineNo) => {
          const isHighlight = highlightLinenos.includes(lineNo + 1)
          const lineProps = getLineProps({ line })
          return (
            <div
              {...lineProps}
              key={lineNo}
              className={cn(
                'yozora-code-highlighter__line',
                {
                  'yozora-code-highlighter__line--highlight': isHighlight,
                },
                lineProps.className,
              )}
            >
              {line.map((token, key) => (
                <span {...getTokenProps({ token })} key={key} />
              ))}
            </div>
          )
        })}
      </div>
    </Container>
  )
}

HighlighterContent.displayName = 'YozoraCodeHighlighterContent'
export default HighlighterContent
