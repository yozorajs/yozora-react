import type { Definition, FootnoteDefinition } from '@yozora/ast'
import React from 'react'
import type { INodeRendererMap } from '../types'
import type { INodeRendererAction } from './action'
import type { INodeRendererState } from './state'
import { initNodeRendererState } from './state'

export interface INodeRendererContext extends INodeRendererState {
  /**
   * Yozora ast node renderer map.
   */
  rendererMap: Readonly<INodeRendererMap>
  /**
   * Link / Image reference definitions.
   */
  definitionMap: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap: Readonly<Record<string, FootnoteDefinition>>
  /**
   *
   */
  dispatch: React.Dispatch<INodeRendererAction>
}

export const NodeRendererContextType = React.createContext<INodeRendererContext>({
  ...initNodeRendererState(),
  definitionMap: {},
  footnoteDefinitionMap: {},
  rendererMap: {} as unknown as INodeRendererMap,
  dispatch: (): never => {
    throw new Error(`No available dispatch prepared yet.`)
  },
})

export const useNodeRendererContext = (): INodeRendererContext =>
  React.useContext(NodeRendererContextType)
