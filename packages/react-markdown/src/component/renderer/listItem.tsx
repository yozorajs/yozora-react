import { cx } from '@emotion/css'
import type { ListItem } from '@yozora/ast'
import { NodesRenderer } from '@yozora/core-react-renderer'
import React from 'react'

/**
 * Render yozora `listItem`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export class ListItemRenderer extends React.PureComponent<ListItem> {
  public override render(): React.ReactElement {
    const { status, children } = this.props
    return (
      <li className={cx('yozora-list-item', { 'yozora-list-task-item': !!status })}>
        <TaskItemCheckbox status={status} />
        <NodesRenderer nodes={children} />
      </li>
    )
  }
}

class TaskItemCheckbox extends React.PureComponent<{ status: string | undefined | null }> {
  public override render(): React.ReactElement {
    const { status } = this.props
    if (status == null) return <React.Fragment />

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
}
