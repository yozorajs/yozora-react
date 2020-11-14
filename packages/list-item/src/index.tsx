import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultListItemTheme, getListItemStyle } from './theme'
export * from './theme'


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
  color: ${ getListItemStyle('color') };
  padding: ${ getListItemStyle('padding') };
  margin: ${ getListItemStyle('margin') };
  line-height: ${ getListItemStyle('lineHeight') };
`


Container.defaultProps = {
  theme: { yozora: { listItem: defaultListItemTheme } }
}


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


ListItem.displayName = 'ListItem'


ListItem.propTypes = {
  status: PropTypes.oneOf<'todo' | 'doing' | 'done'>(['todo', 'doing', 'done']),
  children: PropTypes.node.isRequired,
}


export default ListItem
