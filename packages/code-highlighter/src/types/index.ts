import type { PrismTheme } from 'prism-react-renderer'
import type { RenderProps } from './prism-react-renderer'

export interface CodeHighlighterProps {
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
  showLinenos?: boolean
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
   * Ref of the highlight content element.
   */
  contentRef?:
    | React.RefCallback<HTMLDivElement>
    | React.RefObject<HTMLDivElement>
  /**
   * Ref of the codes area.
   */
  codesRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}

export interface HighlightContentProps extends RenderProps {
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
   * @default '1.8em'
   */
  lineHeight?: React.CSSProperties['lineHeight']
  /**
   * Whether should display line numbers.
   * @default true
   */
  showLinenos?: boolean
  /**
   * Ref of the highlight content element.
   */
  contentRef?:
    | React.RefCallback<HTMLDivElement>
    | React.RefObject<HTMLDivElement>
  /**
   * Ref of the codes area.
   */
  codesRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
  /**
   * Callback when linenoWidth changed.
   */
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void
}
