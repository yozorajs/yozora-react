import React from 'react'
import styled from 'styled-components'
import CodeEmbed, { CodeRendererProps } from '@yozora/react-code-embed'
import JsxPreview from '@yozora/react-code-renderer-jsx'
import MathPreview from '@yozora/react-math'


/**
 * Props for CodeEmbed
 */
export interface CodeEmbedProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   * Error callback
   */
  onError: (error: string | null) => void
}


const jsxScope = { styled }
export function CodeRenderer(props: CodeRendererProps): React.ReactElement | null {
  const { lang, value, onError } = props

  switch (lang) {
    case 'jsx': {
      return (
        <JsxPreview
          code={ value }
          inline={ false }
          scope={ jsxScope }
          onError={ onError }
        />
      )
    }
    case 'math': {
      return (
        <MathPreview value={ value } />
      )
    }
    default: {
      return null
    }
  }
}


/**
 *
 * @param props
 */
export function CustomCodeEmbed(props: CodeEmbedProps): React.ReactElement | null {
  return <CodeEmbed
    lang={ props.lang }
    value={ props.value }
    CodeRenderer={ CodeRenderer }
  />
}


CustomCodeEmbed.displayName = 'CustomCodeEmbed'
export default CustomCodeEmbed
