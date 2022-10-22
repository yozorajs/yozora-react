import type { Node } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../context/context'
import type { INodeRenderer, INodeRendererMap } from '../types'

export interface INodesRendererProps {
  /**
   * Yozora ast nodes.
   */
  nodes?: Node[]
}

export const NodesRenderer: React.FC<INodesRendererProps> = props => {
  const { nodes } = props
  const { rendererMap } = useNodeRendererContext()
  if (nodes == null || nodes.length <= 0) return null
  return <NodesRendererInner nodes={nodes} rendererMap={rendererMap} />
}

interface INodesRendererInnerProps {
  nodes: Node[]
  rendererMap: Readonly<INodeRendererMap>
}

class NodesRendererInner extends React.PureComponent<INodesRendererInnerProps> {
  public override render(): React.ReactElement {
    const { nodes, rendererMap } = this.props
    return (
      <React.Fragment>
        {nodes.map((node, index) => {
          const key = `${node.type}-${index}`
          const Renderer: INodeRenderer = rendererMap[node.type] ?? rendererMap._fallback
          return <Renderer key={key} {...node} />
        })}
      </React.Fragment>
    )
  }
}
