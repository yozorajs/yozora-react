import type { FootnoteDefinition } from '@yozora/ast'
import type { CodeRunnerItem } from '@yozora/react-code-runners'
import type { PreviewImageItem } from '../types'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface YozoraMarkdownContextData {
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
  codeRunners: ReadonlyArray<CodeRunnerItem>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitions: ReadonlyArray<FootnoteDefinition>
  /**
   * Image items.
   */
  images: PreviewImageItem[]
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
  data: Partial<YozoraMarkdownContextData> = {},
): YozoraMarkdownContextData {
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
