import type { Definition, FootnoteDefinition, YastNode } from '@yozora/ast'
import { defaultRendererMap } from './renderer-map'
import type {
  PreviewImageApi,
  TokenRendererContext,
  TokenRendererMap,
} from './types'
import type React from 'react'

/**
 * Render Yozora Markdown AST
 *
 * @param ast
 * @param images
 */
export function createYozoraNodesRenderer(
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  rendererMap?: Partial<TokenRendererMap>,
  imageContext?: PreviewImageApi,
): (nodes: YastNode[]) => React.ReactNode[] {
  const resolvedRendererMap: TokenRendererMap = {
    ...defaultRendererMap,
    ...(rendererMap as TokenRendererMap),
  }

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
    const render =
      resolvedRendererMap[node.type] ?? resolvedRendererMap._fallback
    return render(node, key, ctx)
  }

  function renderNodes(nodes?: YastNode[]): React.ReactNode[] {
    if (nodes == null || nodes.length <= 0) return []
    return nodes.map((v, index) => renderNode(v, index))
  }
}
