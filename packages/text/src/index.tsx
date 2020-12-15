import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
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


/**
 * Render `text` content
 *
 * @param props
 */
export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...htmlProps } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef }>{ value }</Container>
    )
  }
)


Text.propTypes = {
  value: PropTypes.string.isRequired,
}


Text.displayName = 'YozoraText'
export default Text


const Container = styled.span`
  line-height: ${ getTextStyle('lineHeight') };
`


Container.defaultProps = {
  theme: { yozora: { text: defaultTextTheme } }
}


export const TextClasses = {
  container: `${ Container }`
}
