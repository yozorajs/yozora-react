import type React from 'react'
import type { INodeRendererAction } from './action'
import { NodeRendererActionsType } from './action'
import type { INodeRendererState } from './state'

export const reducer: React.Reducer<INodeRendererState, INodeRendererAction> = (
  state: INodeRendererState,
  action: INodeRendererAction,
): INodeRendererState => {
  switch (action.type) {
    case NodeRendererActionsType.IMAGE_VIEWER_TOGGLE: {
      const visible = action.payload ?? !state.imageViewerVisible
      if (visible === state.imageViewerVisible) return state
      return { ...state, imageViewerVisible: visible }
    }
    case NodeRendererActionsType.IMAGE_VIEWER_ADD_ITEM: {
      const { src, alt } = action.payload
      if (state.images.find(image => image.src === src && image.alt === alt) == null) {
        // This modification is intended.
        state.images.push({ src, alt })
      }
      return state
    }
    case NodeRendererActionsType.IMAGE_VIEWER_ACTIVE_ITEM: {
      const { imageActivatedIndex: previousIndex, images, imageViewerVisible } = state

      let currentIndex: number = previousIndex
      if (images.length > 0) {
        const { src, alt } = action.payload
        currentIndex = images.findIndex(image => image.src === src && image.alt === alt)
        if (currentIndex === -1) currentIndex = previousIndex
      }
      if (currentIndex === previousIndex && imageViewerVisible) return state

      return {
        ...state,
        imageActivatedIndex: currentIndex,
        imageViewerVisible: true,
      }
    }
    default:
      return state
  }
}
