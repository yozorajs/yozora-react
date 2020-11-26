import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CodeEmbedError from './error'
import './styled-components'
import { defaultCodeEmbedTheme, getCodeEmbedStyle } from './theme'
export * from './error'
export * from './theme'


/**
 * Props of CodeRenderer
 */
export interface CodeRendererProps {
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


/**
 * Embed mode block code
 */
export interface CodeEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   * render code
   */
  CodeRenderer: (props: CodeRendererProps) => React.ReactElement | null
  /**
   * CSS class name for CodeEmbedError
   */
  errorClassName?: string
}


const ErrorContainer = styled.div<{ hidden: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${ props => props.hidden ? 'none' : 'block' };
  width: 100%;
  height: 100%;
  overflow-y: auto;
`
ErrorContainer.defaultProps = {
  theme: { yozora: { codeEmbed: defaultCodeEmbedTheme } }
}


const Container = styled.div<{ $hasError: boolean }>`
  position: relative;
  ${
    props => props.$hasError
      ? css`
        && {
          border: none;
          padding: 0;
        }
      `
      : css`
        border: ${ getCodeEmbedStyle('border') };
        padding: ${ getCodeEmbedStyle('padding') };
      `
  }
  background: ${ getCodeEmbedStyle('background') };
  color: ${ getCodeEmbedStyle('color') };
`
Container.defaultProps = {
  theme: { yozora: { codeEmbed: defaultCodeEmbedTheme } }
}


export const CodeEmbed = React.forwardRef<HTMLDivElement, CodeEmbedProps>(
  (props, forwardRef) => {
    const { lang, value, errorClassName, CodeRenderer, ...htmlProps } = props

    const [error, setError] = useState<string | null>(null)

    return (
      <Container { ...htmlProps } ref={ forwardRef } $hasError={ error != null }>
        <CodeRenderer
          lang={ lang }
          value={ value }
          onError={ setError }
        />
        <ErrorContainer hidden={ error == null }>
          <CodeEmbedError
            className={ errorClassName }
            error={ error }
          />
        </ErrorContainer>
      </Container>
    )
  }
)


CodeEmbed.displayName = 'CodeEmbed'


CodeEmbed.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  CodeRenderer: PropTypes.oneOfType<any>([
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  errorClassName: PropTypes.string,
}


export default CodeEmbed
