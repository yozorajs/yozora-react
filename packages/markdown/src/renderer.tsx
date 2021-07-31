import type { Definition, FootnoteDefinition, YastNode } from '@yozora/ast'
import type React from 'react'
import type {
  PreviewImageApi,
  TokenRendererContext,
  TokenRendererMap,
} from './types'

/**
 * Render Yozora Markdown AST
 *
 * @param ast
 * @param images
 */
export function createYozoraNodesRenderer(
  rendererMap: TokenRendererMap,
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  imageContext?: PreviewImageApi,
): (nodes: YastNode[]) => React.ReactNode[] {
  const ctx: TokenRendererContext = {
    renderNodes,
    getDefinition: identifier => definitionMap[identifier],
    getFootnoteDefinition: identifier => footnoteDefinitionMap[identifier],
    addPreviewImage:
      imageContext == null
        ? () => void {}
        : imageContext.addPreviewImage.bind(imageContext),
    setImageVisible:
      imageContext == null
        ? () => void {}
        : imageContext.setImageVisible.bind(imageContext),
  }

  return renderNodes

  function renderNode(node: YastNode, key: number | string): React.ReactNode {
    const render = rendererMap[node.type] ?? rendererMap._fallback
    return render(node, key, ctx)
  }

  function renderNodes(nodes?: YastNode[]): React.ReactNode[] {
    if (nodes == null || nodes.length <= 0) return []
    return nodes.map((v, index) => renderNode(v, index))
  }
}
