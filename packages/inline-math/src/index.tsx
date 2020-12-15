import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
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


/**
 * Render `inlineMath` content
 *
 * @param props
 */
export const InlineMath = React.forwardRef<HTMLSpanElement, InlineMathProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...htmlProps } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef }>
        <MathJax.Node inline={ true } formula={ value } />
      </Container>
    )
  }
)


InlineMath.propTypes = {
  value: PropTypes.string.isRequired,
}


InlineMath.displayName = 'YozoraInlineMath'
export default InlineMath


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


export const InlineMathClasses = {
  container: `${ Container }`,
}
