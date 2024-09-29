import type { Link } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { LinkRendererInner } from './inner/LinkRendererInner'

/**
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export const LinkRenderer: INodeRenderer<Link> = props => {
  const { url, title, children: childNodes } = props
  return (
    <LinkRendererInner url={url} title={title} childNodes={childNodes} className="yozora-link" />
  )
}
