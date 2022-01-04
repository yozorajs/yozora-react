import type React from 'react'

export interface IFootnoteItem {
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

export interface IFootnoteDefinitionsProps {
  /**
   * Footnote definition items.
   */
  nodes: IFootnoteItem[]
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
