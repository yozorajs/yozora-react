import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating ListItem
 */
export interface ListItemProps extends React.LiHTMLAttributes<HTMLSpanElement> {
  /**
   * Whether if is a TODO item, and given its status
   */
  status?: 'todo' | 'doing' | 'done'
  /**
   * ListItem content
   */
  children: React.ReactNode
}


const Container = styled.li`
  margin: var(--md-list-item-margin, 0 0 0 .25em);
`


/**
 * Render ListItem content
 *
 * @param props
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, forwardRef): React.ReactElement => {
    const { status, ...listItemProps } = props
    return (
      <Container { ...listItemProps } ref={ forwardRef } />
    )
  }
)


ListItem.propTypes = {
  status: PropTypes.oneOf<'todo' | 'doing' | 'done'>(['todo', 'doing', 'done']),
  children: PropTypes.node.isRequired,
}


ListItem.displayName = 'ListItem'


export default ListItem
