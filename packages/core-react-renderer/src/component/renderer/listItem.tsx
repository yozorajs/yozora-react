import type { ListItem } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `listItem`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export const ListItemRenderer: React.FC<ListItem> = props => {
  return (
    <li className="yozora-list-item">
      <NodesRenderer nodes={props.children} />
    </li>
  )
}
