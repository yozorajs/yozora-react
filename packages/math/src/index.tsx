import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Math
 */
export interface MathProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * inline math content
   */
  value: string
}


const Container = styled.div``


/**
 * Render Math content
 *
 * @param props
 */
export const Math = React.forwardRef<HTMLDivElement, MathProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...mathProps } = props
    return (
      <Container { ...mathProps } ref={ forwardRef }>
        <MathJax.Node inline={ false } formula={ value } />
      </Container>
    )
  }
)


Math.propTypes = {
  value: PropTypes.string.isRequired,
}


Math.displayName = 'Math'


export default Math
