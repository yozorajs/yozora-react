import PropTypes from 'prop-types'
import React from 'react'
import vscDarkTheme from '../theme/vsc-dark'
import vscLightTheme from '../theme/vsc-light'
import type { IPrismTheme } from '../types/prism'
import { HighlightContent } from './HighlightContent'

export interface ICodeHighlighterProps {
  /**
   * Source code contents
   */
  value: string
  /**
   * Code language
   */
  lang?: string | null
  /**
   * Line number of Lines that should be highlighted.
   */
  highlightLinenos?: number[]
  /**
   * Whether the code block is in a collapsed state.
   * @default false
   */
  collapsed?: boolean
  /**
   * Maximum number of rows displayed
   * @default -1
   */
  maxLines?: number
  /**
   * Line height.
   * @default '1.6rem'
   */
  lineHeight?: React.CSSProperties['lineHeight']
  /**
   * Whether should display line numbers.
   * @default true
   */
  showLineNo?: boolean
  /**
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   * @default true
   */
  darken?: boolean
  /**
   * Highlight prism theme.
   */
  theme?: IPrismTheme
  /**
   * Ref of the codes area.
   */
  codesRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}

export const CodeHighlighter: React.FC<ICodeHighlighterProps> = props => {
  const {
    lang,
    value: code,
    darken = true,
    highlightLinenos,
    maxLines = -1,
    lineHeight = '1.6rem',
    collapsed = false,
    showLineNo = true,
    codesRef,
    onLinenoWidthChange,
  } = props

  const theme: IPrismTheme = props.theme ?? (darken ? vscDarkTheme : vscLightTheme)
  return (
    <HighlightContent
      code={code}
      codesRef={codesRef}
      collapsed={collapsed}
      highlightLinenos={highlightLinenos}
      lang={lang ?? undefined}
      lineHeight={lineHeight}
      maxLines={maxLines}
      showLineNo={showLineNo}
      theme={theme}
      onLinenoWidthChange={onLinenoWidthChange}
    />
  )
}

CodeHighlighter.propTypes = {
  codesRef: PropTypes.any,
  collapsed: PropTypes.bool,
  darken: PropTypes.bool,
  highlightLinenos: PropTypes.arrayOf(PropTypes.number) as React.Validator<
    number[] | null | undefined
  >,
  lang: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLines: PropTypes.number,
  onLinenoWidthChange: PropTypes.func,
  showLineNo: PropTypes.bool,
  theme: PropTypes.any,
  value: PropTypes.string.isRequired,
}
CodeHighlighter.displayName = 'YozoraCodeHighlighter'
