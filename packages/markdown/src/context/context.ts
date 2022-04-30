import React from 'react'
import type { IYozoraMarkdownAction } from './actions'
import type { IYozoraMarkdownState } from './state'
import { initYozoraMarkdownState } from './state'

/**
 * Side-effect funcs provided by the YozoraMarkdownContext
 */
export interface IYozoraMarkdownContext extends IYozoraMarkdownState {
  dispatch: React.Dispatch<IYozoraMarkdownAction>
}

/**
 * Create yozora markdown context.
 */
export const YozoraMarkdownContextType = React.createContext<IYozoraMarkdownContext>({
  ...initYozoraMarkdownState(),
  dispatch: (): never => {
    throw new Error(`No available dispatch prepared yet.`)
  },
})
