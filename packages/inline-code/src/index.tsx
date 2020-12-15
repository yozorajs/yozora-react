import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultInlineCodeTheme, getInlineCodeStyle } from './theme'
export * from './theme'


/**
 * Props for creating InlineCode
 */
export interface InlineCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * inline code content
   */
  value: string
}


/**
 * Render `inlineCode` content
 *
 * @param props
 */
export const InlineCode = React.forwardRef<HTMLSpanElement, InlineCodeProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, value, ...htmlProps } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef }>{ value }</Container>
    )
  }
)


InlineCode.propTypes = {
  value: PropTypes.string.isRequired,
}


InlineCode.displayName = 'YozoraInlineCode'
export default InlineCode


const Container = styled.code`
  padding: ${ getInlineCodeStyle('padding') };
  border-radius: ${ getInlineCodeStyle('borderRadius') };
  margin: ${ getInlineCodeStyle('margin') };
  background: ${ getInlineCodeStyle('background') };
  line-height: ${ getInlineCodeStyle('lineHeight') };
  color: ${ getInlineCodeStyle('color') };
  font-family: ${ getInlineCodeStyle('fontFamily') };
  font-size: ${ getInlineCodeStyle('fontSize') };
  font-weight: ${ getInlineCodeStyle('fontWeight') };
  font-style: ${ getInlineCodeStyle('fontStyle') };
  white-space: ${ getInlineCodeStyle('whiteSpace') };
`


Container.defaultProps = {
  theme: { yozora: { inlineCode: defaultInlineCodeTheme } }
}


export const InlineCodeClasses = {
  container: `${ Container}`,
}
