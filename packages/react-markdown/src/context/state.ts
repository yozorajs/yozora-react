import type { ICodeRunnerItem } from '@yozora/react-code-runners'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface IYozoraMarkdownState {
  /**
   * Code runners.
   */
  codeRunners: ReadonlyArray<ICodeRunnerItem>
}

export function initYozoraMarkdownState(
  initialState: Partial<IYozoraMarkdownState> = {},
): IYozoraMarkdownState {
  return {
    codeRunners: initialState.codeRunners ?? [],
  }
}
