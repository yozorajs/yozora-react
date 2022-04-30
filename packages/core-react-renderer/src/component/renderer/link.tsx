import type { Link } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export const LinkRenderer: INodeRenderer<Link> = props => {
  const { url, title } = props
  return (
    <a className="yozora-link" href={url} title={title} rel="noopener, noreferrer" target="_blank">
      <NodesRenderer nodes={props.children} />
    </a>
  )
}
