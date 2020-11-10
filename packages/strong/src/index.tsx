import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defaultStrongTheme, getStrongStyle } from './theme'
export * from './theme'


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
  color: ${ getStrongStyle('color') };
  font-size: ${ getStrongStyle('fontSize') };
  font-weight: ${ getStrongStyle('fontWeight') };
  font-style: ${ getStrongStyle('fontStyle') };
`


Container.defaultProps = {
  theme: { yozora: { strong: defaultStrongTheme } }
}


/**
 * Render Strong content
 *
 * @param props
 */
export const Strong = React.forwardRef<HTMLSpanElement, StrongProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


Strong.displayName = 'Strong'


Strong.propTypes = {
  children: PropTypes.node.isRequired,
}


export default Strong
