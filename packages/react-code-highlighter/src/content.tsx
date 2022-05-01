import { css, cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
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
      className={cx('yozora-code-highlighter-content', classes.container, className)}
      style={style}
    >
      {showLineNo && (
        <div key="lineno" className={classes.lineno} style={{ width: linenoWidth }} ref={linenoRef}>
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
      <div key="code" ref={codesRef} className={classes.code} onScroll={syncScrollEvents}>
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

const classes = {
  container: css({
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    display: 'flex',
    alignItems: 'stretch',
    overflow: 'hidden',
    width: '100%',
    padding: 0,
    transition: 'max-height 0.5s ease-in-out',
    tabSize: 2,
    fontSmooth: 'always',
    whiteSpace: 'pre',
    wordBreak: 'keep-all',
    wordSpacing: 'normal',
    wordWrap: 'normal',
  }),
  line: css({
    display: 'block',
    minWidth: 'fit-content',
    width: '100%',
    padding: '0 6px',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
    overflowWrap: 'inherit',
    tabSize: 'inherit',
    textIndent: 'inherit',
    textRendering: 'inherit',
    textTransform: 'inherit',
    whiteSpace: 'inherit',
    wordBreak: 'inherit',
    wordSpacing: 'inherit',
    wordWrap: 'inherit',
  }),
  highlightLine: css({
    background: 'var(--yozora-colors-background-codeHighlight, hsla(30deg, 90%, 50%, 0.3))',
    borderColor: 'transparent',
  }),
  lineno: css({
    flex: '0 0 auto',
    overflow: 'hidden',
    padding: '0.5rem 0',
    cursor: 'default',
    userSelect: 'none',
    textAlign: 'right',
    borderRight: '1px solid hsla(0deg, 0%, 80%, 0.8)',
    borderColor: 'var(--yozora-colors-border-codeLineno)',
  }),
  code: css({
    flex: '1 1 auto',
    overflow: 'overlay',
    padding: '0.5rem 0',
  }),
  codeWrapper: css({
    minWidth: '100%',
    width: 'fit-content',
  }),
  codeLine: css({
    padding: '0 1rem 0 12px',
  }),
}
