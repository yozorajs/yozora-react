import type { Link } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export const LinkRenderer: React.FC<Link> = props => {
  const { url, title } = props
  return (
    <a className="yozora-link" href={url} title={title} rel="noopener, noreferrer" target="_blank">
      <YozoraNodesRenderer nodes={props.children} />
    </a>
  )
}
