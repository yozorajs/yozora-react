import type {
  Definition,
  FootnoteDefinition,
  Root,
  YastNode,
} from '@yozora/ast'
import { collectFootnoteDefinitions } from '@yozora/ast-util'
import type { CodeRunnerItem } from '@yozora/react-code'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import type { FootnoteItem } from '@yozora/react-footnote-definitions'
import cn from 'clsx'
import React, { useMemo, useState } from 'react'
import { createYozoraNodesRenderer } from './renderer'
import { useRendererMap } from './renderer-map'
import { Container } from './style'
import type {
  PreviewImageApi,
  PreviewImageItem,
  TokenRendererMap,
} from './types'

export interface MarkdownProps {
  /**
   * Root node of Yozora Markdown AST.
   */
  ast: Root
  /**
   * Link / Image reference definitions.
   */
  definitionMap: Record<string, Definition>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap: Record<string, FootnoteDefinition>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
  /**
   * Token renderer map.
   */
  rendererMap?: Partial<TokenRendererMap>
  /**
   * Code runners
   */
  codeRunners?: CodeRunnerItem[]
  /**
   * Image previewer
   *
   *  Browser only:
   *
   *      import Viewer from 'react-viewer'
   *
   *  SSR:
   *
   *      import loadable from '@loadable/component'
   *      const Viewer = loadable(() => import('react-viewer'))
   *
   * @see https://github.com/infeng/react-viewer
   * @see https://github.com/gregberge/loadable-components
   */
  Viewer?: any
}

/**
 * Render yozora markdown ast in react components.
 *
 * @param props
 * @returns
 */
export function Markdown(props: MarkdownProps): React.ReactElement {
  const {
    ast,
    definitionMap,
    footnoteDefinitionMap,
    className,
    style,
    rendererMap: customRendererMap,
    codeRunners,
    Viewer,
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const [images, setImages] = useState<Array<{ src: string; alt: string }>>([])

  const rendererMap = useRendererMap(customRendererMap, codeRunners)
  const renderNodes = useMemo<(nodes: YastNode[]) => React.ReactNode[]>(() => {
    const nextImages: PreviewImageItem[] = []
    const previewImageApi: PreviewImageApi = {
      addPreviewImage: item => nextImages.push(item),
      setImageVisible: setVisible,
    }

    const renderNodes = createYozoraNodesRenderer(
      rendererMap,
      definitionMap,
      footnoteDefinitionMap,
      previewImageApi,
    )

    setImages(nextImages)
    return renderNodes

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendererMap, definitionMap, footnoteDefinitionMap])

  const children = useMemo<React.ReactNode[]>(
    () => renderNodes(ast.children),
    [renderNodes, ast.children],
  )

  const footnotes = useMemo<React.ReactNode>(() => {
    const nodes: FootnoteItem[] = collectFootnoteDefinitions(ast).map(item => ({
      label: item.label,
      identifier: item.identifier,
      children: renderNodes(item.children),
    }))
    if (nodes.length <= 0) return null
    return <YozoraFootnotesRenderer nodes={nodes} />
  }, [renderNodes, ast])

  return (
    <Container className={cn('yozora-markdown', className)} style={style}>
      <section>{children}</section>
      <footer>{footnotes}</footer>
      {Viewer != null && (
        <Viewer
          visible={visible}
          onClose={() => void setVisible(false)}
          images={images}
        />
      )}
    </Container>
  )
}

Markdown.displayName = 'YozoraMarkdown'
