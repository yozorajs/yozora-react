import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef } from 'react'
import type { IHighlightContentProps } from './types'
import { calcHeight } from './util'

/**
 * Content of CodeHighlighter.
 */
export const HighlighterContent: React.FC<IHighlightContentProps> = props => {
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
    <div className={cn('yozora-code-highlighter', className)} style={style}>
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
    </div>
  )
}

HighlighterContent.propTypes = {
  codesRef: PropTypes.any,
  highlightLinenos: PropTypes.array,
  collapsed: PropTypes.bool,
  maxLines: PropTypes.number,
  lineHeight: PropTypes.string,
  showLinenos: PropTypes.bool,
  tokens: PropTypes.array.isRequired,
  getLineProps: PropTypes.func.isRequired,
  getTokenProps: PropTypes.func.isRequired,
  onLinenoWidthChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.any,
}

HighlighterContent.displayName = 'YozoraCodeHighlighterContent'
export default HighlighterContent
