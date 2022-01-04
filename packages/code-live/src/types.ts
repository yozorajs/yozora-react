import type {
  ICodeRunnerItem,
  ICodeRunnerScope,
} from '@yozora/react-code-runners'
import type { PrismTheme } from 'prism-react-renderer'

/**
 * Live mode block code
 */
export interface ICodeLiveProps {
  /**
   * Code runners.
   */
  runners: ReadonlyArray<ICodeRunnerItem>
  /**
   * Language of the source code.
   */
  lang: string
  /**
   * Literal source codes.
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: Readonly<Record<string, unknown>>
  /**
   * Accessible context variables.
   */
  scope?: Readonly<ICodeRunnerScope>
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
   * Whether to display the line numbers.
   */
  showLinenos?: boolean
  /**
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   */
  darken?: boolean
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
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
