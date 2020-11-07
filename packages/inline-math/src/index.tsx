import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating InlineMath
 */
export interface InlineMathProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * inline math content
   */
  value: string
}


const Container = styled.span``


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


InlineMath.propTypes = {
  value: PropTypes.string.isRequired,
}


InlineMath.displayName = 'InlineMath'


export default InlineMath
