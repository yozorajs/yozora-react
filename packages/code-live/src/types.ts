import type { CodeRunnerProps } from '@yozora/react-code-embed'
import type { PrismTheme } from 'prism-react-renderer'

export type { CodeRunnerProps } from '@yozora/react-code-embed'

/**
 * Live mode block code
 */
export interface CodeLiveProps {
  /**
   * Code runners.
   */
  runners: CodeRunnerItem[]
  /**
   * Literal source codes.
   */
  value: string
  /**
   * Language of the source code.
   */
  lang: string
  /**
   * Code title
   */
  title?: string
  /**
   * Maximum number of rows displayed
   */
  maxLines?: number
  /**
   * Whether the code block is in a collapsed state.
   * @default false
   */
  collapsed?: boolean
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
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
   * Set this code live auto focus.
   */
  autoFocus?: boolean
  /**
   * Center the embed contents under the previewer component.
   * @default true
   */
  centerPreviewer?: boolean
}

export interface CodeRunnerItem {
  /**
   * Title of the runner.
   */
  title: string
  /**
   * Supported language pattern.
   */
  pattern: RegExp
  /**
   * Run / Render the given codes.
   */
  runner(props: CodeRunnerProps): React.ReactElement
}
