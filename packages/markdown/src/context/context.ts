import type { IDefinition, IYastNode } from '@yozora/ast'
import React from 'react'
import type { YozoraMarkdownAction } from './actions'
import type { YozoraMarkdownContextData } from './state'
import { initializeYozoraMarkdownContextData } from './state'

/**
 * Side-effect funcs provided by the YozoraMarkdownContext
 */
export interface YozoraMarkdownContextState extends YozoraMarkdownContextData {
  /**
   * Update the context data.
   */
  dispatch: React.Dispatch<YozoraMarkdownAction>
  /**
   * Get link / image reference definition through the given identifier.
   * @param identifier
   */
  getDefinition(identifier: string): Readonly<IDefinition> | undefined
  /**
   * Render yozora AST nodes into React nodes.
   * @param children
   */
  renderYozoraNodes(yozoraNodes?: IYastNode[]): React.ReactNode[]
}

/**
 * Create yozora markdown context.
 */
export const YozoraMarkdownContext: React.Context<YozoraMarkdownContextState> =
  React.createContext({
    ...initializeYozoraMarkdownContextData(),
    dispatch: (): never => {
      throw new Error(`No available dispatch prepared yet.`)
    },
    getDefinition: () => {},
    renderYozoraNodes: () => [],
  } as YozoraMarkdownContextState)
