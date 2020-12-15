import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultEmphasisTheme, getEmphasisStyle } from './theme'
export * from './theme'


/**
 * Props for creating Emphasis
 */
export interface EmphasisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Emphasis content
   */
  children: React.ReactNode
}


/**
 * Render `emphasis` content
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


Emphasis.displayName = 'YozoraEmphasis'
export default Emphasis


const Container = styled.em`
  color: ${ getEmphasisStyle('color') };
  font-size: ${ getEmphasisStyle('fontSize') };
  font-weight: ${ getEmphasisStyle('fontWeight') };
  font-style: ${ getEmphasisStyle('fontStyle') };
`


Container.defaultProps = {
  theme: { yozora: { emphasis: defaultEmphasisTheme } }
}


export const EmphasisClasses = {
  container: `${ Container }`,
}
