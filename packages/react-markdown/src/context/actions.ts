import type { IYozoraMarkdownState } from './state'

export enum YozoraMarkdownActionsType {
  // Reset state data
  RESET_STATE_DATA = '@yozora/state-data/reset',
}

export interface IYozoraMarkdownAction {
  type: YozoraMarkdownActionsType.RESET_STATE_DATA
  payload: Partial<Pick<IYozoraMarkdownState, 'codeRunners'>>
}
