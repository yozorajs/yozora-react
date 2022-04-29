import type { Emphasis } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const EmphasisRenderer: React.FC<Emphasis> = props => {
  return (
    <em className="yozora-emphasis">
      <NodesRenderer nodes={props.children} />
    </em>
  )
}
