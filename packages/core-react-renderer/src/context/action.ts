import type { IPreviewImageItem } from '../types'

export enum NodeRendererActionsType {
  // Toggle the image viewer visibility.
  IMAGE_VIEWER_TOGGLE = '@yozora/image-viewer/toggle',

  // Add a image previewer item.
  IMAGE_VIEWER_ADD_ITEM = '@yozora/image-viewer/add-item',

  // Active a image previewer item.
  IMAGE_VIEWER_ACTIVE_ITEM = '@yozora/image-viewer/active-item',
}

export type INodeRendererAction =
  | {
      type: NodeRendererActionsType.IMAGE_VIEWER_TOGGLE
      payload?: boolean
    }
  | {
      type: NodeRendererActionsType.IMAGE_VIEWER_ADD_ITEM
      payload: IPreviewImageItem
    }
  | {
      type: NodeRendererActionsType.IMAGE_VIEWER_ACTIVE_ITEM
      payload: IPreviewImageItem
    }
