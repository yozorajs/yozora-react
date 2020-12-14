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

  & > :first-child {
    margin-bottom: 0
  }
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
    const { status, ...htmlProps } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef } />
    )
  }
)


ListItem.propTypes = {
  status: PropTypes.oneOf<'todo' | 'doing' | 'done'>(['todo', 'doing', 'done']),
  children: PropTypes.node.isRequired,
}


ListItem.displayName = 'ListItem'
export default ListItem


export const ListItemClasses = {
  container: `${ Container }`,
}
