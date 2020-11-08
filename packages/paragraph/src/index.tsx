import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


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
  padding: var(--md-paragraph-padding, 0);
  margin: var(--md-paragraph-margin, 0 0 1em);
  line-height: var(--md-paragraph-line-height, 2);
`


/**
 * Render Paragraph content
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


Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}


Paragraph.displayName = 'Paragraph'


export default Paragraph
