import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Strong
 */
export interface StrongProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Strong content
   */
  children: React.ReactNode
}


const Container = styled.strong`
  color: var(--md-strong-color);
  font-size: var(--md-strong-font-size, 1em);
  font-style: var(--md-strong-font-style, normal);
  font-weight: var(--md-strong-font-weight, 600);
`


/**
 * Render Strong content
 *
 * @param props
 */
export const Strong = React.forwardRef<HTMLSpanElement, StrongProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, ...strongProps } = props
    return (
      <Container { ...strongProps } ref={ forwardRef }>{ children }</Container>
    )
  }
)


Strong.propTypes = {
  children: PropTypes.node.isRequired,
}


Strong.displayName = 'Strong'


export default Strong
