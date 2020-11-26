import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CodeLiveEditor from '@yozora/react-code-editor'
import CodeEmbed, { CodeRendererProps } from '@yozora/react-code-embed'
import './styled-components'
import { defaultCodeLiveTheme, getCodeLiveStyle } from './theme'
import { debounce } from './util'
export type { CodeRendererProps } from '@yozora/react-code-embed'
export * from './theme'
export * from './util'


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
  CodeRenderer: (props: CodeRendererProps) => React.ReactElement | null
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
  pre, textarea {
    ::selection {
      background: ${ getCodeLiveStyle('editorSelectionBackground') };
    }
  }
`
EditorContainer.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


const WrappedCodeEmbed = styled(CodeEmbed)`
  width: 100%;
  height: 100%;
  border: ${ getCodeLiveStyle('previewBorder') };
  padding: ${ getCodeLiveStyle('previewPadding') };
`


const EmbedContainer = styled.div`
  flex: 0 0 auto;
  display: block;
  overflow: auto;
  color: ${ getCodeLiveStyle('previewColor') };
  background: ${ getCodeLiveStyle('previewBackground') };
`


const Container = styled.div<{ layout: 'horizontal' | 'vertical' }>`
  display: flex;
  ${ props => props.layout === 'horizontal'
    ? css`
        flex-direction: row;
        align-items: stretch;
        ${ EditorContainer }, ${ EmbedContainer } {
          flex: 1 1 0;
          width: 50%;
        }
      `
    : css`
        flex-direction: column;
        ${ EditorContainer }, ${ EmbedContainer } {
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
        <EmbedContainer>
          <WrappedCodeEmbed 
            lang={ lang }
            value={ value }
            errorClassName={ errorClassName }
            CodeRenderer={ CodeRenderer }
          />
        </EmbedContainer>
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
