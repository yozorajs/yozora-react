import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CodeLiveEditor from '@yozora/react-code-editor'
import CodeLiveError from './error'
import { defaultCodeLiveTheme, getCodeLiveStyle } from './theme'
import { debounce } from './util'


/**
 * Live mode block code
 */
export interface CodeLiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Language of code
   */
  lang: string
  /**
   * Source code content
   */
  value: string
  /**
   * render code
   */
  CodeRenderer: (props: {
    /**
     * Code language
     */
    lang: string
    /**
     * Source code contents
     */
    code: string
    /**
     * Error callback
     */
    onError: (error: string | null) => void
  }) => React.ReactElement | null
  /**
   * CSS class name for CodeLiveError
   */
  errorClassName?: string
  /**
   * CSS class name for the editor's textarea element
   */
  editorTextareaClassName?: string
  /**
   * CSS class name for the editor's pre element
   */
  editorPreClassName?: string
}


const EditorContainer = styled.div`
  flex: 0 0 auto;
  overflow: auto;
  padding: ${ getCodeLiveStyle('editorPadding') };
  background: ${ getCodeLiveStyle('editorBackground') };
  caret-color: ${ getCodeLiveStyle('editorCaretColor') };
  font-size: ${ getCodeLiveStyle('editorFontSize') };
  font-family: ${ getCodeLiveStyle('editorFontFamily') };
`
EditorContainer.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


const PreviewContainer = styled.div`
  position: relative;
  flex: 0 0 auto;
  display: block;
  overflow: auto;
  padding: ${ getCodeLiveStyle('previewPadding') };
  border: ${ getCodeLiveStyle('previewBorder') };
  background: ${ getCodeLiveStyle('previewBackground') };
  color: ${ getCodeLiveStyle('previewColor') };
`
PreviewContainer.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
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
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


const Container = styled.div<{ layout: 'horizontal' | 'vertical' }>`
  display: flex;
  ${
    props => props.layout === 'horizontal'
      ? css`
          flex-direction: row;
          ${ EditorContainer }, ${ PreviewContainer } {
            flex: 1 1 0;
            width: 50%;
          }
        `
      : css`
          flex-direction: column;
          ${ EditorContainer }, ${ PreviewContainer } {
            flex: 1 1 auto;
            width: 100%;
          }
        `
  };
`
Container.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


export const CodeLive = React.forwardRef<HTMLDivElement, CodeLiveProps>(
  (props, forwardRef) => {
    const {
      CodeRenderer,
      lang,
      errorClassName,
      editorTextareaClassName,
      editorPreClassName,
      ...divProps
    } = props

    const [error, setError] = useState<string | null>(null)
    const [layout] = useState<'horizontal' | 'vertical'>('horizontal')
    const [value, setValue] = useState<string>(props.value)

    const handleChange = useMemo(() => debounce(setValue, 300), [])

    return (
      <Container { ...divProps } ref={ forwardRef } layout={ layout }>
        <EditorContainer>
          <CodeLiveEditor
            lang={ lang }
            code={ value }
            onChange={ handleChange }
            textareaClassName={ editorTextareaClassName }
            preClassName={ editorPreClassName }
          />
        </EditorContainer>
        <PreviewContainer>
          <CodeRenderer
            lang={ lang }
            code={ value }
            onError={ setError }
          />
          <ErrorContainer hidden={ error == null }>
            <CodeLiveError
              className={ errorClassName }
              error={ error }
            />
          </ErrorContainer>
        </PreviewContainer>
      </Container>
    )
  }
)


CodeLive.displayName = 'CodeLive'


CodeLive.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  CodeRenderer: PropTypes.oneOfType<any>([
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  errorClassName: PropTypes.string,
  editorPreClassName: PropTypes.string,
  editorTextareaClassName: PropTypes.string,
}


export default CodeLive
