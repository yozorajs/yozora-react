import { cx } from '@emotion/css'
import type { IPrismTheme } from '@yozora/react-code-highlighter'
import CodeHighlighter from '@yozora/react-code-highlighter'
import React from 'react'
import { SimpleCodeEditor } from './SimpleCodeEditor'

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
  theme?: IPrismTheme
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
   * @default '1.6rem'
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
export const CodeEditor: React.FC<CodeEditorProps> = props => {
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
    lineHeight = '1.6rem',
  } = props

  const codesRef = React.useRef<HTMLDivElement>(null)
  const [code, setCode] = React.useState<string>(props.code)
  const [linenoWidth, setLinenoWidth] = React.useState<React.CSSProperties['width']>()
  const highlightCode = React.useCallback<React.FC<string>>(
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
        showLineNo={showLinenos}
        onLinenoWidthChange={setLinenoWidth}
      />
    ),
    [lang, darken, theme, collapsed, showLinenos, lineHeight, maxLines],
  )

  const handleChange = React.useCallback(
    (nextCode: string) => {
      setCode(nextCode)
      onChange(nextCode)
    },
    [onChange],
  )

  // Reset code if the props.code has changed
  React.useEffect((): void => setCode(props.code), [props.code])

  // Sync the scroll events.
  /* istanbul ignore next */
  const syncScrollEvents = React.useCallback<React.UIEventHandler<HTMLTextAreaElement>>(e => {
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
    <SimpleCodeEditor
      value={code}
      padding={10}
      highlight={highlightCode}
      onValueChange={handleChange}
      insertSpaces={true}
      textareaClassName={textareaClassName}
      textareaStyle={{
        ...wordStyle,
        ...textareaStyle,
        padding: '0.5rem 0.6em 0 12px',
      }}
      linenoWidth={linenoWidth}
      preClassName={preClassName}
      preStyle={{ ...wordStyle, ...preStyle }}
      className={cx('yozora-code-editor', className)}
      style={{ ...style, lineHeight }}
      autoFocus={autoFocus}
      onScroll={syncScrollEvents}
    />
  )
}
CodeEditor.displayName = 'YozoraCodeEditor'