export interface ICodeLiteralProps {
  /**
   * Literal source codes.
   */
  value: string
  /**
   * Language of the source code.
   */
  lang?: string | null
  /**
   * Code title
   */
  title?: string
  /**
   * Line number of Lines that should be highlighted.
   */
  highlightLinenos?: number[]
  /**
   * Maximum number of rows displayed
   */
  maxLines?: number
  /**
   * Whether the code block is in a collapsed state.
   * @default false
   */
  collapsed?: boolean
  /**
   * Whether to display the line numbers.
   */
  showLineNo?: boolean
  /**
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   */
  darken?: boolean
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

export interface ICodeLiteralState {
  collapsed: boolean
  countOfLines: number
}
