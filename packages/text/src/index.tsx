import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Text
 */
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * text content
   */
  value: string
}


const Container = styled.span`
  line-height: var(--md-text-line-height, inherit);;
`


/**
 * Render Text content
 *
 * @param props
 */
export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...spanProps } = props
    return (
      <Container { ...spanProps } ref={ forwardRef }>{ value }</Container>
    )
  }
)


Text.propTypes = {
  value: PropTypes.string.isRequired,
}


Text.displayName = 'Text'


export default Text
