import type { PrismTheme } from 'prism-react-renderer'
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
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   */
  darken?: boolean
  /**
   * Code highlight theme.
   */
  theme?: PrismTheme
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


export const CodeLive = React.forwardRef<HTMLDivElement, CodeLiveProps>(
  (props, forwardRef) => {
    const {
      CodeRenderer,
      lang,
      darken,
      theme,
      errorClassName,
      editorTextareaClassName,
      editorPreClassName,
      ...htmlProps
    } = props

    const [layout] = useState<'horizontal' | 'vertical'>('horizontal')
    const [value, setValue] = useState<string>(props.value)

    const handleChange = useMemo(() => debounce(setValue, 300), [])

    return (
      <Container { ...htmlProps } ref={ forwardRef } layout={ layout }>
        <EditorContainer>
          <CodeLiveEditor
            lang={ lang }
            code={ value }
            onChange={ handleChange }
            darken={ darken }
            theme={ theme }
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


CodeLive.displayName = 'YozoraCodeLive'
export default CodeLive


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


const horizontalContainer = css`
  flex-direction: row;
  align-items: stretch;
  ${ EditorContainer }, ${ EmbedContainer } {
    flex: 1 1 0;
    width: 50%;
  }
`
const verticalContainer = css`
  flex-direction: column;
  ${ EditorContainer }, ${ EmbedContainer } {
    flex: 1 1 auto;
    width: 100%;
  }
`


const Container = styled.div<{ layout: 'horizontal' | 'vertical' }>`
  display: flex;
  ${ props => props.layout === 'horizontal' ? horizontalContainer : verticalContainer };
`


Container.defaultProps = {
  theme: { yozora: { codeLive: defaultCodeLiveTheme } }
}


export const CodeLiveClasses = {
  container: `${ Container }`,
  editorContainer: `${ EditorContainer }`,
  embedContainer: `${ EmbedContainer }`,
  wrappedCodeEmbed: `${ WrappedCodeEmbed }`,
}
