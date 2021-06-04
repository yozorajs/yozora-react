import cn from 'clsx'
import React, { useCallback, useEffect, useRef } from 'react'
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
    codesRef,
    highlightLinenos = [],
    collapsed = false,
    maxLines = -1,
    lineHeight = '1.6rem',
    showLinenos = true,
    tokens,
    getLineProps,
    getTokenProps,
    onLinenoWidthChange,
    className,
    style: _style,
  } = props

  const linenoRef = useRef<HTMLDivElement>(null)

  const linenoWidth = showLinenos
    ? `${Math.max(2, ('' + tokens.length).length) * 1.1}em`
    : undefined

  useEffect(() => {
    if (onLinenoWidthChange == null) return
    onLinenoWidthChange(linenoWidth)
  }, [linenoWidth, onLinenoWidthChange])

  // Sync lineno width.
  const style: React.CSSProperties = {
    ..._style,
    lineHeight,
    maxHeight: 0,
    backgroundColor: 'none',
  }

  if (!collapsed) {
    const countOfLines = maxLines > 0 ? maxLines : tokens.length
    const maxHeight = calcHeight(lineHeight, countOfLines + 1)
    style.maxHeight = maxHeight
    style.minHeight = '100%'
  }

  // Sync the scroll events.
  /* istanbul ignore next */
  const syncScrollEvents = useCallback<React.UIEventHandler<HTMLDivElement>>(
    e => {
      const codesArea = e.target as HTMLTextAreaElement
      if (codesArea == null) return

      const { scrollTop } = codesArea
      if (linenoRef.current != null) {
        linenoRef.current.scrollTo(0, scrollTop)
      }
    },
    [],
  )

  return (
    <Container className={className} style={style}>
      {showLinenos && (
        <div
          key="linenos"
          className="yozora-code-highlighter__linenos"
          style={{ width: linenoWidth }}
          ref={linenoRef}
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
        key="codes"
        ref={codesRef}
        className="yozora-code-highlighter__codes"
        onScroll={syncScrollEvents}
      >
        <div className="yozora-code-highlighter__codes-wrapper">
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
      </div>
    </Container>
  )
}

HighlighterContent.displayName = 'YozoraCodeHighlighterContent'
export default HighlighterContent
