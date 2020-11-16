import React from 'react'
import styled from 'styled-components'
import { defaultCodeLiveTheme, getCodeLiveStyle } from './theme'


/**
 * Props for creating CodeLiveError
 */
export interface CodeLiveErrorProps extends React.HTMLAttributes<HTMLPreElement> {
  /**
   *
   */
  error: string | null
}


const Container = styled.pre`
  display: block;
  width: 100%;
  min-height: 100%;
  padding: 0.5rem;
  color: ${ getCodeLiveStyle('errorColor') };
  background: ${ getCodeLiveStyle('errorBackground') };
  font-size: ${ getCodeLiveStyle('errorFontSize') };
  font-family: ${ getCodeLiveStyle('errorFontFamily') };
  white-space: pre-wrap;
  text-align: left;
`


Container.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


/**
 *
 * @param props
 */
export function CodeLiveError(props: CodeLiveErrorProps): React.ReactElement | null {
  const { error, children, ...htmlProps } = props
  if (error == null) return null

  return (
    <Container { ...htmlProps }>{ error }</Container>
  )
}


CodeLiveError.displayName = 'CodeLiveError'


export default CodeLiveError
