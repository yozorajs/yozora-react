import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating Blockquote
 */
export interface BlockquoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blockquote content
   */
  children: React.ReactNode
}


const Container = styled.blockquote`
  background: var(--md-blockquote-bg-color);
  border-left: 0.25em solid var(--md-blockquote-border-color);
  padding: var(--md-blockquote-padding, 0.625em 1em);
  margin: var(--md-blockquote-margin, 0 0 1.25em);
`


/**
 * Render Blockquote content
 *
 * @param props
 */
export const Blockquote = React.forwardRef<HTMLDivElement, BlockquoteProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
}


Blockquote.displayName = 'Blockquote'


export default Blockquote
