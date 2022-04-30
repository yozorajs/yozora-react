import { cx } from '@emotion/css'
import type { ListItem } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { NodesRenderer } from '@yozora/core-react-renderer'
import React from 'react'

/**
 * Render yozora `listItem`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export const ListItemRenderer: INodeRenderer<ListItem> = props => {
  const { status } = props
  return (
    <li className={cx('yozora-list-item', { 'yozora-list-task-item': !!status })}>
      <TaskItemCheckbox status={status} />
      <NodesRenderer nodes={props.children} />
    </li>
  )
}

export const TaskItemCheckbox: React.FC<{ status: string | undefined | null }> = ({ status }) => {
  if (status == null) return null
  switch (status) {
    case 'done':
      return (
        <span className="yozora-list-task-item__checkbox">
          <input type="checkbox" disabled={true} checked={true} />
          <span data-status={status} />
        </span>
      )
    case 'doing':
    case 'todo':
    default:
      return (
        <span className="yozora-list-task-item__checkbox">
          <input type="checkbox" disabled={true} />
          <span data-status={status} />
        </span>
      )
  }
}
