import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultDeleteTheme, getDeleteStyle } from './theme'
export * from './theme'


/**
 * Props for creating Delete
 */
export interface DeleteProps extends React.DelHTMLAttributes<HTMLSpanElement> {
  /**
   * Delete content
   */
  children: React.ReactNode
}


/**
 * Render `delete` content
 *
 * @param props
 */
export const Delete = React.forwardRef<HTMLSpanElement, DeleteProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


Delete.propTypes = {
  children: PropTypes.node.isRequired,
}


Delete.displayName = 'YozoraDelete'
export default Delete


const Container = styled.del`
  color: ${ getDeleteStyle('color') };
  font-size: ${ getDeleteStyle('fontSize') };
  font-weight: ${ getDeleteStyle('fontWeight') };
  font-style: ${ getDeleteStyle('fontStyle') };
  text-decoration: ${ getDeleteStyle('textDecoration') };
`


Container.defaultProps = {
  theme: { yozora: { delete: defaultDeleteTheme } }
}


export const DeleteClasses = {
  container: `${ Container }`,
}
