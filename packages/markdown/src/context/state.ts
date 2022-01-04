import type { IFootnoteDefinition } from '@yozora/ast'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import type { IPreviewImageItem } from '../types'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface IYozoraMarkdownContextData {
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

export function initializeYozoraMarkdownContextData(
  data: Partial<IYozoraMarkdownContextData> = {},
): IYozoraMarkdownContextData {
  return {
    codeRunners: data.codeRunners ?? [],
    footnoteDefinitions: [],
    darken: data.darken ?? false,
    preferLinenos: data.preferLinenos ?? true,
    images: [],
    imageViewerVisible: false,
    imageActivatedIndex: -1,
  }
}
