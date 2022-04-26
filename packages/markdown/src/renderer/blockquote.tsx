import type { Blockquote } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `blockquote`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export const BlockquoteRenderer: React.FC<Blockquote> = props => {
  return (
    <blockquote className="yozora-blockquote">
      <YozoraNodesRenderer nodes={props.children} />
    </blockquote>
  )
}
