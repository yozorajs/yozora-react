import type { Definition as IDefinition } from '@yozora/ast'
import React from 'react'
import type { IYozoraMarkdownAction } from './actions'
import type { IYozoraMarkdownState } from './state'
import { initializeYozoraMarkdownState } from './state'

/**
 * Side-effect funcs provided by the YozoraMarkdownContext
 */
export interface IYozoraMarkdownContext extends IYozoraMarkdownState {
  /**
   * Update the context data.
   */
  dispatch: React.Dispatch<IYozoraMarkdownAction>
  /**
   * Get link / image reference definition through the given identifier.
   * @param identifier
   */
  getDefinition(identifier: string): Readonly<IDefinition> | undefined
}

/**
 * Create yozora markdown context.
 */
export const YozoraMarkdownContextType: React.Context<IYozoraMarkdownContext> = React.createContext(
  {
    ...initializeYozoraMarkdownState(),
    dispatch: (_action: IYozoraMarkdownAction): never => {
      throw new Error(`No available dispatch prepared yet.`)
    },
    getDefinition: _identifier => {},
  } as IYozoraMarkdownContext,
)
