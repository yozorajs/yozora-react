import type { Blockquote } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `blockquote`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export const BlockquoteRenderer: INodeRenderer<Blockquote> = props => {
  return (
    <blockquote className="yozora-blockquote">
      <NodesRenderer nodes={props.children} />
    </blockquote>
  )
}
