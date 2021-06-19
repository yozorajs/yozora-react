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
   * Error callback
   */
  onError(error: string | null): void
  /**
   * Accessible context variables.
   */
  scope?: Record<string, unknown>
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
   * For executing or rendering the given code.
   */
  CodeRunner(props: CodeRunnerProps): React.ReactElement | null
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

export interface YozoraCodeEmbedState {
  /**
   *
   */
  error?: unknown
}
