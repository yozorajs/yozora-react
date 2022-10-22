import type { Blockquote } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `blockquote`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export class BlockquoteRenderer extends React.PureComponent<Blockquote> {
  public override render(): React.ReactElement {
    return (
      <blockquote className="yozora-blockquote">
        <NodesRenderer nodes={this.props.children} />
      </blockquote>
    )
  }
}
