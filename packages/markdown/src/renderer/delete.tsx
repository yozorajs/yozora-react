import type { Delete } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `delete`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#delete
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export const DeleteRenderer: React.FC<Delete> = props => {
  return (
    <del className="yozora-delete">
      <YozoraNodesRenderer nodes={props.children} />
    </del>
  )
}
