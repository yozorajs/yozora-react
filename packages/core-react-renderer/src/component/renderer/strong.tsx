import type { Strong } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `strong`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#strong
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const StrongRenderer: React.FC<Strong> = props => {
  return (
    <strong className="yozora-strong">
      <NodesRenderer nodes={props.children} />
    </strong>
  )
}
