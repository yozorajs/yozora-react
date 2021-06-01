import CodeHighlighter from '@yozora/react-code-highlighter'
import cn from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SimpleCodeEditor from './editor'
import type { PrismTheme } from 'prism-react-renderer'

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
   * Triggered when the code changed.
   */
  onChange(code: string): void
  /**
   * Maximum number of rows displayed
   */
  maxLines?: number
  /**
   * Whether the code block is in a collapsed state.
   */
  collapsed?: boolean
  /**
   * Whether should display line numbers.
   */
  showLinenos?: boolean
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
   * CSS class for the top container element.
   */
  className?: string
  /**
   * CSS style object for the container
   */
  style?: React.CSSProperties
  /**
   * Line height.
   * @default '1.8em'
   */
  lineHeight?: React.CSSProperties['lineHeight']
  /**
   * Set the editor focus in default.
   */
  autoFocus?: boolean
}

/**
 * Simple live code editor
 * @param props
 */
export function CodeEditor(props: CodeEditorProps): React.ReactElement {
  const {
    lang,
    maxLines,
    collapsed,
    showLinenos,
    textareaClassName,
    textareaStyle,
    preClassName,
    preStyle,
    onChange,
    darken,
    theme,
    autoFocus,
    style,
    className,
    lineHeight = '1.8em',
  } = props

  const codesRef = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState<string>(props.code)
  const [linenoWidth, setLinenoWidth] = useState<React.CSSProperties['width']>()
  const highlightCode = useCallback<React.FC<string>>(
    code => (
      <CodeHighlighter
        codesRef={codesRef}
        lang={lang}
        value={code}
        darken={darken}
        theme={theme}
        lineHeight={lineHeight}
        maxLines={maxLines}
        collapsed={collapsed}
        showLinenos={showLinenos}
        onLinenoWidthChange={setLinenoWidth}
      />
    ),
    [lang, darken, theme, collapsed, showLinenos, lineHeight, maxLines],
  )

  const handleChange = useCallback(
    (nextCode: string) => {
      setCode(nextCode)
      onChange(nextCode)
    },
    [onChange],
  )

  // Reset code if the props.code has changed
  useEffect((): void => setCode(props.code), [props.code])

  // Sync the scroll events.
  /* istanbul ignore next */
  const syncScrollEvents = useCallback<
    React.UIEventHandler<HTMLTextAreaElement>
  >(e => {
    const textarea = e.target as HTMLTextAreaElement
    if (textarea == null) return

    const { scrollLeft, scrollTop } = textarea

    if (codesRef.current != null) {
      codesRef.current.scrollTo(scrollLeft, scrollTop)
    }
  }, [])

  const wordStyle: React.CSSProperties = {
    tabSize: 2,
    whiteSpace: 'pre',
  }

  return (
    <Container
      value={code}
      padding={10}
      highlight={highlightCode}
      onValueChange={handleChange}
      insertSpaces={true}
      textareaClassName={textareaClassName}
      textareaStyle={{
        ...wordStyle,
        ...textareaStyle,
        borderLeft: `${linenoWidth} solid transparent`,
        padding: '0 0.6em',
      }}
      preClassName={preClassName}
      preStyle={{ ...wordStyle, ...preStyle }}
      className={cn('yozora-code-editor', className)}
      style={{ ...style, lineHeight }}
      autoFocus={autoFocus}
      onScroll={syncScrollEvents}
    />
  )
}

CodeEditor.displayName = 'YozoraCodeEditor'
export default CodeEditor

const Container = styled(SimpleCodeEditor)`
  font-family: var(--code-font-family, Consolas, 'Source Code Pro', monospace, sans-serif);
  border: 1px solid var(--code-color-border, lightgray);
  border-radius: 4px;

  & > pre {
    code, span {
      line-height: inherit;
    }
    code {
      padding: 0;
      margin: 0;
      background: transparent;
    }
  }

  .yozora-code-highlighter__codes {
    overflow-x: hidden;
  }
`
