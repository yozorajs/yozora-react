import { cx } from '@emotion/css'
import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import PropTypes from 'prop-types'
import React from 'react'
import { NodeRendererContextType } from '../context/context'
import type { INodeRendererContext } from '../context/context'
import { reducer } from '../context/reducer'
import { initNodeRendererState } from '../context/state'
import { useNodeRendererMap } from '../hook/useNodeRendererMap'
import { useStyles } from '../hook/useStyles'
import type { INodeRendererMap, INodeStyleMap } from '../types'
import { YozoraImageViewer } from './ImagePreviewer'
import type { IYozoraImageViewerProps } from './ImagePreviewer'

export interface INodeRendererContextProviderProps {
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
   * Custom token style map.
   */
  customStyleMap?: Readonly<Partial<INodeStyleMap>>
  /**
   * Descendant elements.
   */
  children?: React.ReactNode
  /**
   * Root element className.
   */
  rootClassName?: string
  /**
   * Custom image viewer.
   */
  ImageViewer?: IYozoraImageViewerProps['ImageViewer']
}

/**
 * A HoC component to provider NodeRendererContext
 * @param props
 * @returns
 */
export const NodeRendererContextProvider: React.FC<INodeRendererContextProviderProps> = props => {
  const { definitionMap, footnoteDefinitionMap, ImageViewer } = props
  const className: string = cx(useStyles(props.customStyleMap), props.rootClassName)

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
      <div className={className}>{props.children}</div>
      <YozoraImageViewer ImageViewer={ImageViewer} />
    </NodeRendererContextType.Provider>
  )
}

NodeRendererContextProvider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  customRendererMap: PropTypes.object as any,
  customStyleMap: PropTypes.object as any,
  children: PropTypes.node.isRequired,
  rootClassName: PropTypes.string,
  ImageViewer: PropTypes.any,
}
NodeRendererContextProvider.displayName = 'YozoraNodeRendererContextProvider'
