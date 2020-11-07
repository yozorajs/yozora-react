import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Delete
 */
export interface DeleteProps extends React.DelHTMLAttributes<HTMLSpanElement> {
  /**
   * Delete content
   */
  children: React.ReactNode
}


const Container = styled.del`
  color: var(--md-delete-color);
  font-size: var(--md-delete-font-size, 1em);
  font-style: var(--md-delete-font-style, normal);
  text-decoration: var(--md-delete-text-decoration, line-through);
`


/**
 * Render Delete content
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


Delete.displayName = 'Delete'


export default Delete
