/**
 *
 */
export interface MdastPropsNode {
  /**
   * Data node type
   */
  type: string
  /**
   *
   */
  [key: string]: any
}


/**
 * Mdast props ast
 */
export interface MdastPropsRoot {
  /**
   * Root node
   */
  type: 'root'
  /**
   * Child nodes
   */
  children: MdastPropsNode[]
}
