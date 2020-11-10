import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defaultTextTheme, getTextStyle } from './theme'
export * from './theme'


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
  line-height: ${ getTextStyle('lineHeight') };
`


Container.defaultProps = {
  theme: { yozora: { text: defaultTextTheme } }
}


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


Text.displayName = 'Text'


Text.propTypes = {
  value: PropTypes.string.isRequired,
}


export default Text
