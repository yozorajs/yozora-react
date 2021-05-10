import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface ListItemProps {
  /**
   * Whether if is a TODO item, and given its status
   */
  status?: 'todo' | 'doing' | 'done'
  /**
   * ListItem content
   */
  children?: React.ReactNode
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

/**
 * Render yozora `listItem`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export function ListItem(props: ListItemProps): React.ReactElement {
  const { className = 'yozora-list-item', style, status, children } = props
  const checkbox: React.ReactNode = null
  return (
    <li className={cn('yozora-list-item', className)} style={style}>
      {checkbox}
      {children}
    </li>
  )
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  status: PropTypes.oneOf<'todo' | 'doing' | 'done'>(['todo', 'doing', 'done']),
  style: PropTypes.object,
}

ListItem.displayName = 'YozoraListItem'
export default ListItem
