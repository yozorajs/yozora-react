import type { ICodeRunner } from '@yozora/react-code-runners'

/**
 * Embed mode block code
 */
export interface ICodeEmbedProps {
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
  runner: ICodeRunner
}

export interface ICodeEmbedState {
  /**
   *
   */
  error?: unknown
}
