import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defaultMathTheme, getMathStyle } from './theme'
export * from './theme'


/**
 * Props for creating Math
 */
export interface MathProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * math content
   */
  value: string
}


const Container = styled.div`
  padding: ${ getMathStyle('padding') };
  border: ${ getMathStyle('border') };
  margin: ${ getMathStyle('margin') };
  background: ${ getMathStyle('background') };
  color: ${ getMathStyle('color') };
`


Container.defaultProps = {
  theme: { yozora: { math: defaultMathTheme } }
}


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


Math.displayName = 'Math'


Math.propTypes = {
  value: PropTypes.string.isRequired,
}


export default Math
