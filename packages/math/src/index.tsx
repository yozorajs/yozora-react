import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
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


/**
 * Render `math` content
 *
 * @param props
 */
export const Math = React.forwardRef<HTMLDivElement, MathProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...htmlProps } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef }>
        <MathJax.Node inline={ false } formula={ value } />
      </Container>
    )
  }
)


Math.propTypes = {
  value: PropTypes.string.isRequired,
}


Math.displayName = 'YozoraMath'
export default Math


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


export const MathClasses = {
  container: `${ Container }`,
}
