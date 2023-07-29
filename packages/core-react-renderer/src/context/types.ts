import type { Definition, FootnoteDefinition } from '@yozora/ast'
import type { INodeRendererMap, IPreviewImageItem } from '../types'
import type { NodeRendererActionsType } from './constant'

export interface INodeRendererState {
  /**
   * Image items.
   */
  readonly images: IPreviewImageItem[]
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

export interface INodeRendererActionToggleImageVisible {
  type: NodeRendererActionsType.TOGGLE_IMAGE_VISIBLE
  payload?: boolean
}

export interface INodeRendererActionAddImage {
  type: NodeRendererActionsType.ADD_IMAGE
  payload: IPreviewImageItem
}

export interface INodeRendererActionActiveImage {
  type: NodeRendererActionsType.ACTIVE_IMAGE
  payload: IPreviewImageItem
}

export type INodeRendererAction =
  | INodeRendererActionToggleImageVisible
  | INodeRendererActionAddImage
  | INodeRendererActionActiveImage
