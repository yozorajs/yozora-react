import type { List } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `list`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const ListRenderer: INodeRenderer<List> = props => {
  const { ordered, orderType, start } = props

  if (ordered) {
    return (
      <ol className="yozora-list" type={orderType} start={start}>
        <NodesRenderer nodes={props.children} />
      </ol>
    )
  }

  return (
    <ul className="yozora-list">
      <NodesRenderer nodes={props.children} />
    </ul>
  )
}
