import type { ListItem } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `listItem`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export class ListItemRenderer extends React.PureComponent<ListItem> {
  public override render(): React.ReactElement {
    return (
      <li className="yozora-list-item">
        <NodesRenderer nodes={this.props.children} />
      </li>
    )
  }
}
