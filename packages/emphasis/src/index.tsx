import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Emphasis
 */
export interface EmphasisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Emphasis content
   */
  children: React.ReactNode
}


const Container = styled.em`
  color: var(--md-emphasis-color);
  font-size: var(--md-emphasis-font-size, 1em);
  font-style: var(--md-emphasis-font-style, italic);
`


/**
 * Render Emphasis content
 *
 * @param props
 */
export const Emphasis = React.forwardRef<HTMLSpanElement, EmphasisProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


Emphasis.propTypes = {
  children: PropTypes.node.isRequired,
}


Emphasis.displayName = 'Emphasis'


export default Emphasis
