import React from 'react'
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
  color: var(--md-text-color);
  font-size: var(--md-text-font-size, '1rem');
`


/**
 * Render Text content
 *
 * @param props
 */
export function Text(props: TextProps): React.ReactElement {
  const { children, value, ...spanProps } = props

  return (
    <Container { ...spanProps }>{ props.value }</Container>
  )
}


export default Text
