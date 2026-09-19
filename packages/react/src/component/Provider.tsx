import type { INodeRendererMap, INodeRendererProviderProps } from '@yozora/react-renderer'
import { NodeRendererProvider } from '@yozora/react-renderer'
import React from 'react'

export interface IMarkdownProviderProps extends INodeRendererProviderProps {
  /** Default renderers supplied by a syntax preset; consumer overrides take precedence. */
  rendererMap: Readonly<INodeRendererMap>
}

export const MarkdownProvider: React.FC<IMarkdownProviderProps> = props => {
  const { rendererMap, customRendererMap, ...rest } = props
  const mergedRendererMap = React.useMemo(() => {
    const result = { ...rendererMap }
    for (const [type, renderer] of Object.entries(customRendererMap ?? {})) {
      if (renderer) result[type] = renderer
    }
    return result
  }, [rendererMap, customRendererMap])
  return <NodeRendererProvider {...rest} customRendererMap={mergedRendererMap} />
}
