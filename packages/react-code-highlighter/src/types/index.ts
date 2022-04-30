import type { PrismTheme } from 'prism-react-renderer'
import type { IRenderProps } from './prism-react-renderer'

export interface ICodeHighlighterProps {
  /**
   * Source code contents
   */
  value: string
  /**
   * Code language
   */
  lang?: string
  /**
   * Line number of Lines that should be highlighted.
   */
  highlightLinenos?: number[]
  /**
   * Whether the code block is in a collapsed state.
   */
  collapsed?: boolean
  /**
   * Maximum number of rows displayed
   */
  maxLines?: number
  /**
   * Line height.
   */
  lineHeight?: React.CSSProperties['lineHeight']
  /**
   * Whether should display line numbers.
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
  theme?: PrismTheme
  /**
   * Ref of the codes area.
   */
  codesRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}

export interface IHighlightContentProps extends IRenderProps {
  /**
   * Line number of Lines that should be highlighted.
   * @default []
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
   * Ref of the codes area.
   */
  codesRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}
