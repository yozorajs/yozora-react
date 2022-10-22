import type { List } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `list`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export class ListRenderer extends React.PureComponent<List> {
  public override render(): React.ReactElement {
    const { ordered, orderType, start, children } = this.props

    if (ordered) {
      return (
        <ol className="yozora-list" type={orderType} start={start}>
          <NodesRenderer nodes={children} />
        </ol>
      )
    }

    return (
      <ul className="yozora-list">
        <NodesRenderer nodes={children} />
      </ul>
    )
  }
}
