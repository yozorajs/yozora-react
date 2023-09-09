import type { Definition, FootnoteDefinition } from '@yozora/ast'
import type { INodeRendererMap, IPreviewImageItem } from '../types'
import type { NodeRendererActionsType } from './constant'

export interface INodeRendererState {
  /**
   * Image items.
   */
  readonly images: ReadonlyArray<IPreviewImageItem>
  /**
   * Whether if the image viewer is visible.
   */
  readonly imageViewerVisible: boolean
  /**
   * Index of the current visible image item.
   */
  readonly imageActivatedIndex: number
  /**
   * Determine if show code line number.
   */
  readonly showCodeLineno: boolean
  /**
   * Yozora ast node renderer map.
   */
  readonly rendererMap: Readonly<INodeRendererMap>
  /**
   * Link / Image reference definitions.
   */
  readonly definitionMap: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  readonly footnoteDefinitionMap: Readonly<Record<string, FootnoteDefinition>>
}

export type INodeRendererAction<T extends NodeRendererActionsType = NodeRendererActionsType> = {
  [K in NodeRendererActionsType]: INodeRendererActionPayloadMap[K] extends void
    ? {
        type: K
        payload?: INodeRendererActionPayloadMap[K]
      }
    : {
        type: K
        payload: INodeRendererActionPayloadMap[K]
      }
}[T]

export interface INodeRendererActionPayloadMap {
  [NodeRendererActionsType.TOGGLE_IMAGE_VISIBLE]: boolean | undefined | void
  [NodeRendererActionsType.ACTIVE_IMAGE]: IPreviewImageItem
}
