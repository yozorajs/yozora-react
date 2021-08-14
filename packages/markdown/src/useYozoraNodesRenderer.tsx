import type { Definition, FootnoteDefinition, YastNode } from '@yozora/ast'
import type { CodeRunnerItem } from '@yozora/react-code'
import type React from 'react'
import { useMemo } from 'react'
import type {
  PreviewImageItem,
  TokenRendererContext,
  TokenRendererMap,
} from './types'
import useYozoraRendererMap from './useYozoraRendererMap'

export interface YozoraNodesRendererProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap: Record<string, Definition>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap: Record<string, FootnoteDefinition>
  /**
   * custom token renderer map.
   */
  customRendererMap?: Partial<TokenRendererMap>
  /**
   * Code runners.
   */
  codeRunners?: CodeRunnerItem[]
  /**
   * Set index of current activated image.
   */
  setImageActivatedIndex: React.Dispatch<React.SetStateAction<number>>
}

export type YozoraNodesRenderer = (nodes?: YastNode[]) => {
  /**
   *
   */
  nodes: React.ReactNode[]
  /**
   *
   */
  images: PreviewImageItem[]
}

/**
 * Render Yozora Markdown AST
 *
 * @param ast
 * @param images
 */
export function useYozoraNodesRenderer(
  options: YozoraNodesRendererProps,
): YozoraNodesRenderer {
  const {
    definitionMap,
    footnoteDefinitionMap,
    customRendererMap,
    codeRunners,
    setImageActivatedIndex,
  } = options

  const rendererMap = useYozoraRendererMap(customRendererMap, codeRunners)
  const renderNodes = useMemo<YozoraNodesRenderer>(() => {
    const images: PreviewImageItem[] = []
    const ctx: TokenRendererContext = {
      renderNodes: _renderNodes,
      getDefinition: identifier => definitionMap[identifier],
      getFootnoteDefinition: identifier => footnoteDefinitionMap[identifier],
      addPreviewImage: ({ src, alt }) => {
        let index = images.findIndex(
          item => item.src === src && item.alt === item.alt,
        )
        if (index < 0) {
          index = images.length
          images.push({ src, alt })
        }
        return () => setImageActivatedIndex(index)
      },
    }
    const renderNodes: YozoraNodesRenderer = (nodes?: YastNode[]) => {
      const results: React.ReactNode[] = _renderNodes(nodes)
      return { images, nodes: results }
    }
    return renderNodes

    function _renderNodes(nodes?: YastNode[]): React.ReactNode[] {
      if (nodes == null || nodes.length <= 0) return []
      return nodes.map((v, index) => _renderNode(v, index))
    }

    function _renderNode(
      node: YastNode,
      key: number | string,
    ): React.ReactNode {
      const render = rendererMap[node.type] ?? rendererMap._fallback
      return render(node, key, ctx)
    }
  }, [
    rendererMap,
    definitionMap,
    footnoteDefinitionMap,
    setImageActivatedIndex,
  ])

  return renderNodes
}

export default useYozoraNodesRenderer
