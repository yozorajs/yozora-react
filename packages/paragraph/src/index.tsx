import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultParagraphTheme, getParagraphStyle } from './theme'
export * from './theme'


/**
 * Props for creating Paragraph
 */
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Paragraph content
   */
  children: React.ReactNode
}


const Container = styled.p`
  padding: ${ getParagraphStyle('padding') };
  margin: ${ getParagraphStyle('margin') };
  line-height: ${ getParagraphStyle('lineHeight') };
  color: ${ getParagraphStyle('color') };
`


Container.defaultProps = {
  theme: { yozora: { paragraph: defaultParagraphTheme } }
}


/**
 * Render `paragraph` content
 *
 * @param props
 */
export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


Paragraph.displayName = 'Paragraph'


Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}


export default Paragraph
