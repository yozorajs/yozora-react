import React from 'react'
import styled from 'styled-components'
import { defaultCodeEmbedTheme, getCodeEmbedStyle } from './theme'


/**
 * Props for creating CodeEmbedError
 */
export interface CodeEmbedErrorProps extends React.HTMLAttributes<HTMLPreElement> {
  /**
   *
   */
  error: string | null
}


/**
 *
 * @param props
 */
export function CodeEmbedError(props: CodeEmbedErrorProps): React.ReactElement | null {
  const { error, children, ...htmlProps } = props
  if (error == null) return null

  return (
    <Container { ...htmlProps }>{ error }</Container>
  )
}


CodeEmbedError.displayName = 'YozoraCodeEmbedError'
export default CodeEmbedError


const Container = styled.pre`
  display: block;
  width: 100%;
  min-height: 100%;
  padding: 0.5rem;
  color: ${ getCodeEmbedStyle('errorColor') };
  background: ${ getCodeEmbedStyle('errorBackground') };
  font-size: ${ getCodeEmbedStyle('errorFontSize') };
  font-family: ${ getCodeEmbedStyle('errorFontFamily') };
  white-space: pre-wrap;
  text-align: left;
`


Container.defaultProps = {
  theme: { yozora: { codeEmbed: defaultCodeEmbedTheme } }
}


export const CodeEmbedErrorClasses = {
  container: `${ Container }`,
}
