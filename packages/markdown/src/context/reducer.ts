import type React from 'react'
import type { IYozoraMarkdownAction } from './actions'
import { YozoraMarkdownActionsType } from './actions'
import type { IYozoraMarkdownState } from './state'

export const reducer: React.Reducer<IYozoraMarkdownState, IYozoraMarkdownAction> = (
  state: IYozoraMarkdownState,
  action: IYozoraMarkdownAction,
): IYozoraMarkdownState => {
  switch (action.type) {
    case YozoraMarkdownActionsType.RESET_STATE_DATA: {
      const { codeRunners = state.codeRunners } = action.payload
      if (state.codeRunners === codeRunners) return state
      return { codeRunners }
    }
    default:
      return state
  }
}
