import type { Node as IYastNode } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../context/context'

export interface INodesRendererProps {
  /**
   * Yozora ast nodes.
   */
  nodes?: IYastNode[]
}

export const NodesRenderer: React.FC<INodesRendererProps> = props => {
  const { nodes } = props
  const { rendererMap } = useNodeRendererContext()

  if (nodes == null || nodes.length <= 0) return null

  return (
    <React.Fragment>
      {nodes.map((node, index) => {
        const key = `${node.type}-${index}`
        const Renderer = rendererMap[node.type] ?? rendererMap._fallback
        return <Renderer key={key} {...node} />
      })}
    </React.Fragment>
  )
}
