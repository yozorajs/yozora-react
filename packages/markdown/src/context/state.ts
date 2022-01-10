import type { IFootnoteDefinition } from '@yozora/ast'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import type { INodeRendererMap, IPreviewImageItem } from '../types'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface IYozoraMarkdownState {
  /**
   * Whether if to enable the dark mode.
   */
  darken: boolean
  /**
   * Display linenos as the default behavior in YozoraCode components.
   */
  preferLinenos: boolean
  /**
   * Code runners.
   */
  codeRunners: ReadonlyArray<ICodeRunnerItem>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitions: ReadonlyArray<IFootnoteDefinition>
  /**
   * Yozora ast node renderer map.
   */
  rendererMap: Readonly<INodeRendererMap>
  /**
   * Image items.
   */
  images: IPreviewImageItem[]
  /**
   * Whether if the image viewer is visible.
   */
  imageViewerVisible: boolean
  /**
   * Index of the current visible image item.
   */
  imageActivatedIndex: number
}

export function initializeYozoraMarkdownState(
  initialState: Partial<IYozoraMarkdownState> = {},
): IYozoraMarkdownState {
  return {
    codeRunners: initialState.codeRunners ?? [],
    footnoteDefinitions: [],
    darken: initialState.darken ?? false,
    preferLinenos: initialState.preferLinenos ?? true,
    rendererMap: {} as any,
    images: [],
    imageViewerVisible: false,
    imageActivatedIndex: -1,
  }
}
