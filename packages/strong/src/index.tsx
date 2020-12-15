import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
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


/**
 * Render `strong` content
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


Strong.propTypes = {
  children: PropTypes.node.isRequired,
}


Strong.displayName = 'YozoraStrong'
export default Strong


const Container = styled.strong`
  color: ${ getStrongStyle('color') };
  font-size: ${ getStrongStyle('fontSize') };
  font-weight: ${ getStrongStyle('fontWeight') };
  font-style: ${ getStrongStyle('fontStyle') };
`


Container.defaultProps = {
  theme: { yozora: { strong: defaultStrongTheme } }
}


export const StrongClasses = {
  container: `${ Container }`,
}
