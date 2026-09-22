/**
 * Meta data of the fenced-code.
 */
export interface ICodeMetaData {
  /**
   * The line numbers of the highlighted rows. Metadata parsing returns distinct,
   * sorted positive integers within the supplied code line count.
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
