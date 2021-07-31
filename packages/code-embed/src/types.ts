export interface CodeRunnerMetaData {
  /**
   * The execution mode of a runner.
   * @default 'inline'
   */
  jsxMode?: 'inline' | 'block'
  /**
   * Additional attributes.
   */
  [key: string]: unknown
}

/**
 * Props of CodeRunner
 */
export interface CodeRunnerProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: CodeRunnerMetaData
  /**
   * Accessible context variables.
   */
  scope?: Record<string, unknown>
  /**
   * Error callback
   */
  onError(error: string | null): void
}

/**
 * Embed mode block code
 */
export interface YozoraCodeEmbedProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: Record<string, unknown>
  /**
   * Accessible context variables.
   */
  scope?: Record<string, unknown>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
  /**
   * For executing or rendering the given code.
   */
  CodeRunner(props: CodeRunnerProps): React.ReactElement | null
}

export interface YozoraCodeEmbedState {
  /**
   *
   */
  error?: unknown
}
