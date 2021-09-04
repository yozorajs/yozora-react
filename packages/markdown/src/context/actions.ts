import type { PreviewImageItem } from '../types'
import type { YozoraMarkdownContextData } from './state'

export enum YozoraMarkdownActionsType {
  // Reset state data
  RESET_STATE_DATA = '@yozora/state-data/reset',

  // Toggle the darken mode.
  TOGGLE_DARKEN_MODE = '@yozora/toggle/darken',

  // Toggle the image viewer visibility.
  IMAGE_VIEWER_TOGGLE = '@yozora/image-viewer/toggle',

  // Add a image previewer item.
  IMAGE_VIEWER_ADD_ITEM = '@yozora/image-viewer/add-item',

  // Active a image previewer item.
  IMAGE_VIEWER_ACTIVE_ITEM = '@yozora/image-viewer/active-item',
}

export type YozoraMarkdownAction =
  | {
      type: YozoraMarkdownActionsType.RESET_STATE_DATA
      payload: Partial<
        Pick<
          YozoraMarkdownContextData,
          'codeRunners' | 'footnoteDefinitions' | 'darken' | 'preferLinenos'
        >
      >
    }
  | {
      type: YozoraMarkdownActionsType.TOGGLE_DARKEN_MODE
      payload?: boolean
    }
  | {
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_TOGGLE
      payload?: boolean
    }
  | {
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_ADD_ITEM
      payload: PreviewImageItem
    }
  | {
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_ACTIVE_ITEM
      payload: PreviewImageItem
    }
