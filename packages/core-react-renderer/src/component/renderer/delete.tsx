import type { Delete } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `delete`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#delete
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export class DeleteRenderer extends React.PureComponent<Delete> {
  public override render(): React.ReactElement {
    return (
      <del className="yozora-delete">
        <NodesRenderer nodes={this.props.children} />
      </del>
    )
  }
}
