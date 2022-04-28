import type { List } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `list`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const ListRenderer: React.FC<List> = props => {
  const { ordered, orderType, start } = props
  const children: React.ReactElement = <YozoraNodesRenderer nodes={props.children} />

  if (ordered) {
    return (
      <ol type={orderType} start={start} className="yozora-list">
        {children}
      </ol>
    )
  }

  return <ul className="yozora-list">{children}</ul>
}
