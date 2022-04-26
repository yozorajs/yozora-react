import type { Emphasis } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const EmphasisRenderer: React.FC<Emphasis> = props => {
  return (
    <em className="yozora-emphasis">
      <YozoraNodesRenderer nodes={props.children} />
    </em>
  )
}
