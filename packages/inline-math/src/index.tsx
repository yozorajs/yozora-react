import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defaultInlineMathTheme, getInlineMathStyle } from './theme'
export * from './theme'


/**
 * Props for creating InlineMath
 */
export interface InlineMathProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * inline math content
   */
  value: string
}


const Container = styled.span`
  padding: ${ getInlineMathStyle('padding') };
  border: ${ getInlineMathStyle('border') };
  margin: ${ getInlineMathStyle('margin') };
  background: ${ getInlineMathStyle('background') };
  color: ${ getInlineMathStyle('color') };
`

Container.defaultProps = {
  theme: { yozora: { inlineMath: defaultInlineMathTheme } }
}


/**
 * Render InlineMath content
 *
 * @param props
 */
export const InlineMath = React.forwardRef<HTMLSpanElement, InlineMathProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...mathProps } = props
    return (
      <Container { ...mathProps } ref={ forwardRef }>
        <MathJax.Node inline={ true } formula={ value } />
      </Container>
    )
  }
)


InlineMath.displayName = 'InlineMath'


InlineMath.propTypes = {
  value: PropTypes.string.isRequired,
}


export default InlineMath
