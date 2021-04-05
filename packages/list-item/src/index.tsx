import PropTypes from 'prop-types'
import React from 'react'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * ListItem content
   */
  children?: React.ReactNode
  /**
   * Whether if is a TODO item, and given its status
   */
  status?: 'todo' | 'doing' | 'done'
  /**
   * Root css class of the component.
   * @default 'yozora-list-item'
   */
  className?: string
}

/**
 * Render yozora `listItem`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list-item
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-list-item', children, ...htmlProps } = props
    return (
      <li {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </li>
    )
  },
)

ListItem.propTypes = {
  children: PropTypes.node,
  status: PropTypes.oneOf<'todo' | 'doing' | 'done'>(['todo', 'doing', 'done']),
  className: PropTypes.string,
}

ListItem.displayName = 'YozoraListItem'
export default ListItem
