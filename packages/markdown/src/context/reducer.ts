import type React from 'react'
import type { YozoraMarkdownAction } from './actions'
import { YozoraMarkdownActionsType } from './actions'
import type { YozoraMarkdownContextData } from './state'

export const reducer: React.Reducer<
  YozoraMarkdownContextData,
  YozoraMarkdownAction
> = (
  state: YozoraMarkdownContextData,
  action: YozoraMarkdownAction,
): YozoraMarkdownContextData => {
  switch (action.type) {
    case YozoraMarkdownActionsType.RESET_STATE_DATA: {
      const {
        footnoteDefinitions = state.footnoteDefinitions,
        codeRunners = state.codeRunners,
        darken = state.darken,
        preferLinenos = state.preferLinenos,
      } = action.payload

      if (
        state.footnoteDefinitions === footnoteDefinitions &&
        state.codeRunners === codeRunners &&
        state.darken === darken &&
        state.preferLinenos === preferLinenos
      ) {
        return state
      }

      const shouldReset: boolean = codeRunners !== state.codeRunners
      return {
        codeRunners,
        footnoteDefinitions,
        darken,
        preferLinenos,
        images: shouldReset ? [] : state.images,
        imageViewerVisible: shouldReset ? false : state.imageViewerVisible,
        imageActivatedIndex: shouldReset ? -1 : state.imageActivatedIndex,
      }
    }
    case YozoraMarkdownActionsType.TOGGLE_DARKEN_MODE: {
      const visible = action.payload ?? !state.darken
      if (visible === state.darken) return state
      return { ...state, darken: visible }
    }
    case YozoraMarkdownActionsType.IMAGE_VIEWER_TOGGLE: {
      const visible = action.payload ?? !state.imageViewerVisible
      if (visible === state.imageViewerVisible) return state
      return { ...state, imageViewerVisible: visible }
    }
    case YozoraMarkdownActionsType.IMAGE_VIEWER_ADD_ITEM: {
      const { src, alt } = action.payload
      if (
        state.images.find(image => image.src === src && image.alt === alt) ==
        null
      ) {
        // This modification is intended.
        state.images.push({ src, alt })
      }
      return state
    }
    case YozoraMarkdownActionsType.IMAGE_VIEWER_ACTIVE_ITEM: {
      const {
        imageActivatedIndex: previousIndex,
        images,
        imageViewerVisible,
      } = state

      let currentIndex: number = previousIndex
      if (images.length > 0) {
        const { src, alt } = action.payload
        currentIndex = images.findIndex(
          image => image.src === src && image.alt === alt,
        )
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

export default reducer
