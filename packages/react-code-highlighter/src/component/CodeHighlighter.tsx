import PropTypes from 'prop-types'
import React from 'react'
import vscDarkTheme from '../theme/vsc-dark'
import vscLightTheme from '../theme/vsc-light'
import type { IPrismTheme } from '../types/prism'
import { HighlightContent } from './HighlightContent'

interface IProps {
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
   * Custom css class for the container.
   */
  className?: string
  /**
   * Custom css class for the codes area.
   */
  codesClassName?: string
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}

export class CodeHighlighter extends React.PureComponent<IProps> {
  public static readonly displayName = 'YozoraCodeHighlighter'
  public static readonly propTypes = {
    codesRef: PropTypes.any,
    collapsed: PropTypes.bool,
    darken: PropTypes.bool,
    highlightLinenos: PropTypes.arrayOf(PropTypes.number) as any,
    lang: PropTypes.string,
    maxLines: PropTypes.number,
    onLinenoWidthChange: PropTypes.func,
    showLineNo: PropTypes.bool,
    theme: PropTypes.any,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    codesClassName: PropTypes.string,
  }

  public override render(): React.ReactElement {
    const {
      lang,
      value: code,
      darken = true,
      highlightLinenos = [],
      maxLines = -1,
      collapsed = false,
      showLineNo = true,
      codesRef,
      onLinenoWidthChange,
      className,
      codesClassName,
    } = this.props

    const theme: IPrismTheme = this.props.theme ?? (darken ? vscDarkTheme : vscLightTheme)
    return (
      <HighlightContent
        code={code}
        codesRef={codesRef}
        collapsed={collapsed}
        highlightLinenos={highlightLinenos}
        language={lang ?? ''}
        maxLines={maxLines}
        showLineno={showLineNo}
        theme={theme}
        onLinenoWidthChange={onLinenoWidthChange}
        className={className}
        codesClassName={codesClassName}
      />
    )
  }
}
