import { isEqual } from '@guanghechen/equal'
import type { IPrismTheme } from '@yozora/react-code-highlighter'
import CodeHighlighter from '@yozora/react-code-highlighter'
import React from 'react'
import { SimpleCodeEditor } from './SimpleCodeEditor'

interface IProps {
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
  showLineNo?: boolean
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
   * Set the editor focus in default.
   */
  autoFocus?: boolean
}

interface IState {
  code: string
  linenoWidth: React.CSSProperties['width']
}

/**
 * Simple live code editor
 */
export class CodeEditor extends React.Component<IProps, IState> {
  public static readonly displayName = 'CodeEditor'

  protected readonly codesRef: React.RefObject<HTMLDivElement>

  constructor(props: IProps) {
    super(props)
    this.state = {
      code: props.code,
      linenoWidth: undefined,
    }
    this.codesRef = { current: null }
  }

  public override render(): React.ReactElement {
    const {
      textareaClassName,
      textareaStyle,
      preClassName,
      preStyle,
      autoFocus,
      style,
      className,
    } = this.props
    const { code, linenoWidth } = this.state
    const { highlightCode, syncScrollEvents, onChange } = this

    const wordStyle: React.CSSProperties = {
      tabSize: 2,
      whiteSpace: 'pre',
    }

    return (
      <SimpleCodeEditor
        value={code}
        padding={10}
        highlight={highlightCode}
        onValueChange={onChange}
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
        className={className}
        style={style}
        autoFocus={autoFocus}
        onScroll={syncScrollEvents}
      />
    )
  }

  public override componentDidUpdate(prevProps: Readonly<IProps>): void {
    const props = this.props

    // Reset code if the props.code has changed
    if (props.code !== prevProps.code) {
      this.setState({ code: props.code })
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.code !== nextState.code ||
      state.linenoWidth !== nextState.linenoWidth ||
      !isEqual(props, nextProps)
    )
  }

  protected readonly highlightCode = (code: string): React.ReactElement => {
    const { lang, maxLines, collapsed, showLineNo, darken, theme } = this.props
    const { codesRef, onLinenoWidthChange } = this

    return (
      <CodeHighlighter
        codesRef={codesRef}
        lang={lang}
        value={code}
        darken={darken}
        theme={theme}
        maxLines={maxLines}
        collapsed={collapsed}
        showLineNo={showLineNo}
        onLinenoWidthChange={onLinenoWidthChange}
      />
    )
  }

  // Sync the scroll events.
  /* istanbul ignore next */
  protected readonly syncScrollEvents = (e: React.UIEvent<HTMLTextAreaElement>): void => {
    const textarea = e.target as HTMLTextAreaElement
    if (textarea == null) return

    const { scrollLeft, scrollTop } = textarea
    const { codesRef } = this

    if (codesRef.current != null) {
      codesRef.current.scrollTo(scrollLeft, scrollTop)
    }
  }

  protected readonly onChange = (code: string): void => {
    this.setState({ code })
    this.props.onChange(code)
  }

  protected readonly onLinenoWidthChange = (linenoWidth: React.CSSProperties['width']): void => {
    this.setState({ linenoWidth })
  }
}
