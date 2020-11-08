import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating InlineCode
 */
export interface InlineCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * inline code content
   */
  value: string
}


const Container = styled.code`
  padding: var(--md-inline-code-padding, 0.2em);
  border-radius: var(--md-inline-code-border-radius, 2px);
  margin: var(--md-inline-code-margin, 0);
  background: var(--md-inline-code-bg-color);
  color: var(--md-inline-code-color);
  font-family: var(--md-inline-code-font-family, 'Consolas, monospace, sans-serif');
  font-size: var(--md-inline-code-font-size, 1em);
  font-weight: var(--md-inline-code-font-weight, 500);
  line-height: var(--md-inline-code-line-height, 1.375);
  white-space: var(--md-inline-code-white-space, normal);
`


/**
 * Render InlineCode content
 *
 * @param props
 */
export const InlineCode = React.forwardRef<HTMLSpanElement, InlineCodeProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...codeProps } = props
    return (
      <Container { ...codeProps } ref={ forwardRef }>{ value }</Container>
    )
  }
)


InlineCode.propTypes = {
  value: PropTypes.string.isRequired,
}


InlineCode.displayName = 'InlineCode'


export default InlineCode
