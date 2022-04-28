import type { Node as IYastNode } from '@yozora/ast'
import PropTypes from 'prop-types'
import React from 'react'
import { YozoraMarkdownContextType } from './context/context'

export interface IYozoraNodesRendererProps {
  /**
   * Yozora ast nodes.
   */
  nodes?: IYastNode[]
}

export const YozoraNodesRenderer: React.FC<{ nodes?: IYastNode[] }> = props => {
  // const rendererMap: Readonly<ITokenRendererMap> =
  //   useYozoraRendererMap(customRendererMap)
  const { nodes } = props
  const { rendererMap } = React.useContext(YozoraMarkdownContextType)

  if (nodes == null || nodes.length <= 0) return null

  return (
    <React.Fragment>
      {nodes.map((node, key) => {
        const Renderer = rendererMap[node.type] ?? rendererMap._fallback
        return <Renderer key={key} {...node} />
      })}
    </React.Fragment>
  )
}

YozoraNodesRenderer.propTypes = {
  nodes: PropTypes.array,
}
