import type { Emphasis } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const EmphasisRenderer: INodeRenderer<Emphasis> = props => {
  return (
    <em className="yozora-emphasis">
      <NodesRenderer nodes={props.children} />
    </em>
  )
}
