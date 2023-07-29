import type { ICodeMetaData as IBaseCodeMetaData } from '@yozora/core-react-renderer'
import type { ICodeRunnerItem, ICodeRunnerMetaData } from '@yozora/react-code-runners'

export interface ICodeProps {
  /**
   * Literal source codes.
   */
  value: string
  /**
   * Language of the source code.
   */
  lang?: string | null
  /**
   * Meta data of the code block.
   */
  meta?: string | null
  /**
   * Code runners.
   */
  runners?: ReadonlyArray<ICodeRunnerItem>
  /**
   * Enable darken mode.
   */
  darken?: boolean
  /**
   * Display linenos in default.
   * @default true
   */
  showCodeLineno?: boolean
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
export interface ICodeMetaData extends IBaseCodeMetaData, ICodeRunnerMetaData {
  /**
   * Rendering mode.
   */
  _yozoracodemode: 'live' | 'embed' | 'literal' | string
}
