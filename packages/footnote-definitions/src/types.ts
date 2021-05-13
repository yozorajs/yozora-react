export interface FootnoteItem {
  /**
   * Footnote reference label
   */
  label: string
  /**
   * Footnote reference identifier.
   */
  identifier: string
  /**
   * Toc title
   */
  children: React.ReactNode
}

export interface FootnoteDefinitionsProps {
  /**
   * Footnote definition items.
   */
  nodes: FootnoteItem[]
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}
