import type { Emphasis } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export class EmphasisRenderer extends React.PureComponent<Emphasis> {
  public override render(): React.ReactElement {
    return (
      <em className="yozora-emphasis">
        <NodesRenderer nodes={this.props.children} />
      </em>
    )
  }
}
