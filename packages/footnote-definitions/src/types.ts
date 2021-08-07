import type React from 'react'

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
   *
   * @default 'footnote-definitions'
   */
  title?: React.ReactNode
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}
