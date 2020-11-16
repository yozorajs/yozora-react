import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import CodeHighlighter from '@yozora/react-code-highlighter'
import { getCodeStyle } from '@yozora/react-code'
import SimpleCodeEditor from './editor.no-cover'


/**
 * Props for creating CodeEditor
 */
export interface CodeEditorProps {
  /**
   * Language of the source code
   */
  lang: string
  /**
   * Source code
   */
  code: string
  /**
   * Trigger when the code changed
   */
  onChange: (code: string) => void
  /**
   * CSS class name for the underlying textarea
   */
  textareaClassName?: string
  /**
   * CSS style object for the underlying textarea
   */
  textareaStyle?: React.CSSProperties
  /**
   * CSS class name for the underlying pre
   */
  preClassName?: string
  /**
   * CSS style object for the underlying pre
   */
  preStyle?: React.CSSProperties
  /**
   * CSS class name for the container
   */
  className?: string
  /**
   * CSS style object for the container
   */
  style?: React.CSSProperties
}


const Container = styled(SimpleCodeEditor)`
  white-space: pre;
  font-family: Consolas, "Source Code Pro", monospace, sans-serif;
  & > pre {
    code, span {
      line-height: inherit !important;
    }
    code {
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
    }

  }
  & > pre, & > textarea {
    ::selection {
      background: ${ getCodeStyle('selectionBackground') };
    }
  }
`


/**
 * Simple live code editor
 * @param props
 */
export function CodeEditor(props: CodeEditorProps): React.ReactElement {
  const {
    lang,
    textareaClassName,
    textareaStyle,
    preClassName,
    preStyle,
    onChange,
    className,
    style,
  } = props

  const [code, setCode] = useState<string>(props.code)
  const [lineCount, setLineCount] = useState<number>(0)

  const linenoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`
  const highlightCode = useMemo(() => {
    return function HighlightCode(code: string): React.ReactElement {
      return (
        <CodeHighlighter
          lang={ lang }
          value={ code }
          linenoWidth={ linenoWidth }
          onLineCountChange={ setLineCount }
        />
      )
    }
  }, [lang, linenoWidth])

  const handleChange = useMemo(() => {
    return (nextCode: string) => {
      setCode(nextCode)
      onChange(nextCode)
    }
  }, [onChange])

  useEffect(() => {
    setCode(props.code)
  }, [props.code, setCode])

  const wordStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'break-word',
    lineHeight: 'inherit',
    tabSize: 2,
  }

  return (
    <Container
      value={ code }
      padding={ 10 }
      highlight={ highlightCode }
      onValueChange={ handleChange }
      insertSpaces={ true }
      textareaClassName={ textareaClassName }
      textareaStyle={{
        ...wordStyle,
        ...textareaStyle,
        paddingLeft: linenoWidth,
      }}
      preClassName={ preClassName }
      preStyle={{
        ...wordStyle,
        ...preStyle,
        paddingLeft: 0,
      }}
      className={ className }
      style={{

        ...style,
      }}
    />
  )
}


CodeEditor.displayName = 'CodeEditor'


export default CodeEditor
