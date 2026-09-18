/**
 * Meta data of the fenced-code.
 */
export interface ICodeMetaData {
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
   * Whether to collapse the code component.
   */
  collapsed?: boolean
  /**
   * Whether to display the line numbers.
   */
  showlineno: boolean
  /**
   * Code title.
   */
  title: string
  /**
   * Unknown key / value pairs.
   */
  [key: Lowercase<string>]: unknown
}
