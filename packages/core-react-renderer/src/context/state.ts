import type { IPreviewImageItem } from '../types'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface INodeRendererState {
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

export function initNodeRendererState(): INodeRendererState {
  return {
    images: [],
    imageViewerVisible: false,
    imageActivatedIndex: -1,
  }
}
