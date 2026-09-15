import type { Blockquote } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `blockquote`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export class BlockquoteRenderer extends React.Component<Blockquote> {
  public override shouldComponentUpdate(nextProps: Readonly<Blockquote>): boolean {
    const props = this.props
    return props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const childNodes = this.props.children
    return (
      <blockquote className={cls}>
        <NodesRenderer nodes={childNodes} />
      </blockquote>
    )
  }
}

const cls = 'yozora-blockquote yozora-blockquote__root'
