import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { useHighlightTokens } from '../hook/useHighlightTokens'
import { classes } from '../style'
import type { IPrismTheme } from '../types/prism'
import { calcHeight } from '../util/height'
import { HighlightLinenos } from './HighlightLinenos'
import { HighlightTokens } from './HighlightTokens'

export interface IHighlightContentProps {
  /**
   * Source literal code.
   */
  code: string
  /**
   * Ref of the codes area.
   */
  codesRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement> | undefined
  /**
   * Whether the code block is in a collapsed state.
   */
  collapsed: boolean
  /**
   * Line number of Lines that should be highlighted.
   */
  highlightLinenos: number[] | undefined
  /**
   * Code language.
   */
  lang: string | undefined
  /**
   * Line height.
   */
  lineHeight: React.CSSProperties['lineHeight']
  /**
   * Maximum number of rows displayed
   */
  maxLines: number
  /**
   * Whether should display line numbers.
   */
  showLineNo: boolean
  /**
   * Highlight prism theme.
   */
  theme: IPrismTheme
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}

export const HighlightContent: React.FC<IHighlightContentProps> = props => {
  const {
    code,
    codesRef,
    collapsed = false,
    highlightLinenos = [],
    lang = '',
    lineHeight,
    maxLines,
    showLineNo = true,
    theme,
    onLinenoWidthChange,
  } = props

  const {
    tokens,
    getLineProps,
    getTokenProps,
    className,
    style: baseStyle,
  } = useHighlightTokens(code, lang, theme)

  const countOfLines: number = maxLines > 0 ? maxLines : tokens.length
  const linenoWidth: string | undefined = showLineNo
    ? `${Math.max(2, String(tokens.length).length) * 1.1}em`
    : undefined
  const linenoRef = React.useRef<HTMLDivElement>(null)

  // Sync the scroll events.
  const syncScrollEvents = React.useCallback<React.UIEventHandler<HTMLDivElement>>(e => {
    const codesArea = e.target as HTMLTextAreaElement
    if (codesArea == null) return

    const { scrollTop } = codesArea
    if (linenoRef.current != null) {
      linenoRef.current.scrollTo(0, scrollTop)
    }
  }, [])

  const maxHeight = React.useMemo(
    () => calcHeight(lineHeight, countOfLines + 1),
    [lineHeight, countOfLines],
  )

  React.useEffect(() => {
    onLinenoWidthChange?.(linenoWidth)
  }, [linenoWidth, onLinenoWidthChange])

  // Sync lineno width.
  const style: React.CSSProperties = {
    ...baseStyle,
    lineHeight,
    maxHeight: 0,
    backgroundColor: 'none',
  }
  if (!collapsed) {
    style.maxHeight = maxHeight
    style.minHeight = '100%'
  }

  return (
    <div className={cx(classes.container, className)} style={style}>
      {showLineNo && (
        <div
          key="linenos"
          className={classes.lineno}
          style={{ width: linenoWidth }}
          ref={linenoRef}
        >
          <HighlightLinenos countOfLines={countOfLines} highlightLinenos={highlightLinenos} />
        </div>
      )}
      <div key="codes" ref={codesRef} className={classes.codes} onScroll={syncScrollEvents}>
        <div className={classes.codeWrapper}>
          <HighlightTokens
            tokens={tokens}
            highlightLinenos={highlightLinenos}
            getLineProps={getLineProps}
            getTokenProps={getTokenProps}
          />
        </div>
      </div>
    </div>
  )
}

HighlightContent.propTypes = {
  code: PropTypes.string.isRequired,
  codesRef: PropTypes.any,
  collapsed: PropTypes.bool.isRequired,
  highlightLinenos: PropTypes.array,
  lang: PropTypes.string,
  lineHeight: PropTypes.string,
  maxLines: PropTypes.number.isRequired,
  showLineNo: PropTypes.bool.isRequired,
  onLinenoWidthChange: PropTypes.func,
}
