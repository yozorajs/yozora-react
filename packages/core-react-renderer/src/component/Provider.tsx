import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import PropTypes from 'prop-types'
import React from 'react'
import { NodeRendererContextType } from '../context/context'
import type { INodeRendererContext } from '../context/context'
import { reducer } from '../context/reducer'
import { initNodeRendererState } from '../context/state'
import { useNodeRendererMap } from '../hook/useNodeRendererMap'
import type { INodeRendererMap } from '../types'
import { ImagePreviewer } from './ImagePreviewer'
import type { IImagePreviewerProps } from './ImagePreviewer'

export interface INodeRendererProviderProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap?: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap?: Readonly<Record<string, FootnoteDefinition>>
  /**
   * Custom token renderer map.
   */
  customRendererMap?: Readonly<Partial<INodeRendererMap>>
  /**
   * Descendant elements.
   */
  children?: React.ReactNode
  /**
   * Custom image viewer.
   */
  ImageViewer?: IImagePreviewerProps['ImageViewer']
}

/**
 * A HoC component to provider NodeRendererContext
 */
export const NodeRendererProvider: React.FC<INodeRendererProviderProps> = props => {
  const { definitionMap, footnoteDefinitionMap, ImageViewer } = props
  const rendererMap: Readonly<INodeRendererMap> = useNodeRendererMap(props.customRendererMap)
  const [state, dispatch] = React.useReducer(reducer, {}, initNodeRendererState)

  const context: INodeRendererContext = useDeepCompareMemo<INodeRendererContext>(
    () => ({
      ...state,
      definitionMap: definitionMap ?? {},
      footnoteDefinitionMap: footnoteDefinitionMap ?? {},
      rendererMap,
      dispatch,
    }),
    [state, definitionMap, footnoteDefinitionMap, rendererMap, dispatch],
  )

  return (
    <NodeRendererContextType.Provider value={context}>
      {props.children}
      <ImagePreviewer ImageViewer={ImageViewer} />
    </NodeRendererContextType.Provider>
  )
}

NodeRendererProvider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  customRendererMap: PropTypes.object as any,
  children: PropTypes.node.isRequired,
  ImageViewer: PropTypes.any,
}
NodeRendererProvider.displayName = 'YozoraNodeRendererProvider'
