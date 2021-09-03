import type {
  CodeRunnerItem,
  CodeRunnerMetaData,
} from '@yozora/react-code-runners'

export interface CodeProps {
  /**
   * Literal source codes.
   */
  value: string
  /**
   * Language of the source code.
   */
  lang?: string
  /**
   * Meta data of the code block.
   */
  meta?: string
  /**
   * Code runners.
   */
  runners?: ReadonlyArray<CodeRunnerItem>
  /**
   * Enable darken mode.
   */
  darken?: boolean
  /**
   * Display linenos in default.
   * @default true
   */
  preferLinenos?: boolean
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

/**
 * Meta data of the fenced-code.
 */
export interface CodeMetaData extends CodeRunnerMetaData {
  /**
   * Rendering mode.
   */
  _yozoraCodeMode: 'live' | 'embed' | 'literal' | string
  /**
   * The line number of the highlighted row.
   */
  highlights: number[]
  /**
   * Maximum number of rows displayed
   * @default -1
   */
  maxlines: number
  /**
   * Code title.
   */
  title: string
  /**
   * Whether to display the line numbers.
   */
  showLinenos: boolean
  /**
   * Whether to collapse the code component.
   */
  collapsed?: boolean
  /**
   * Unknown key / value pairs.
   */
  [key: string]: unknown
}
