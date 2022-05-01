import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import type { IHighlightContentProps } from './types'
import { calcHeight } from './util'

/**
 * Content of CodeHighlighter.
 */
export const CodeHighlighterContent: React.FC<IHighlightContentProps> = props => {
  const {
    codesRef,
    highlightLinenos = [],
    collapsed = false,
    maxLines = -1,
    lineHeight = '1.6rem',
    showLineNo = true,
    tokens,
    getLineProps,
    getTokenProps,
    onLinenoWidthChange,
    className,
  } = props
  const countOfLines: number = maxLines > 0 ? maxLines : tokens.length
  const linenoWidth: string | undefined = showLineNo
    ? `${Math.max(2, String(tokens.length).length) * 1.1}em`
    : undefined
  const linenoRef = React.useRef<HTMLDivElement>(null)

  // Sync the scroll events.
  /* istanbul ignore next */
  const syncScrollEvents = React.useCallback<React.UIEventHandler<HTMLDivElement>>(e => {
    const codesArea = e.target as HTMLTextAreaElement
    if (codesArea == null) return

    const { scrollTop } = codesArea
    if (linenoRef.current != null) {
      linenoRef.current.scrollTo(0, scrollTop)
    }
  }, [])

  // Sync lineno width.
  const style: React.CSSProperties = React.useMemo(() => {
    const result: React.CSSProperties = {
      ...props.style,
      lineHeight,
      maxHeight: 0,
      backgroundColor: 'none',
    }

    if (!collapsed) {
      const maxHeight = calcHeight(lineHeight, countOfLines + 1)
      result.maxHeight = maxHeight
      result.minHeight = '100%'
    }
    return result
  }, [props.style, lineHeight, countOfLines, collapsed])

  React.useEffect(() => {
    if (onLinenoWidthChange == null) return
    onLinenoWidthChange(linenoWidth)
  }, [linenoWidth, onLinenoWidthChange])

  return (
    <div
      className={cx('yozora-code-highlighter__content', classes.container, className)}
      style={style}
    >
      {showLineNo && (
        <div
          key="linenos"
          className={cx('yozora-code-highlighter__linenos', classes.lineno)}
          style={{ width: linenoWidth }}
          ref={linenoRef}
        >
          {tokens.map((_, lineNo) => {
            const isHighlight = highlightLinenos.includes(lineNo + 1)
            return (
              <div
                key={lineNo}
                className={cx(classes.line, { [classes.highlightLine]: isHighlight })}
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
        className={cx('yozora-code-highlighter__codes', classes.codes)}
        onScroll={syncScrollEvents}
      >
        <div className={classes.codeWrapper}>
          {tokens.map((line, lineNo) => {
            const isHighlight = highlightLinenos.includes(lineNo + 1)
            const lineProps = getLineProps({ line })
            return (
              <div
                {...lineProps}
                key={lineNo}
                className={cx(
                  classes.line,
                  classes.codeLine,
                  { [classes.highlightLine]: isHighlight },
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

CodeHighlighterContent.propTypes = {
  codesRef: PropTypes.any,
  highlightLinenos: PropTypes.array,
  collapsed: PropTypes.bool,
  maxLines: PropTypes.number,
  lineHeight: PropTypes.string,
  showLineNo: PropTypes.bool,
  tokens: PropTypes.array.isRequired,
  getLineProps: PropTypes.func.isRequired,
  getTokenProps: PropTypes.func.isRequired,
  onLinenoWidthChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.any,
}
CodeHighlighterContent.displayName = 'YozoraCodeHighlighterContent'
