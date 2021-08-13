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
import React, { useCallback, useMemo, useState } from 'react'
import { createYozoraNodesRenderer } from './renderer'
import { useRendererMap } from './renderer-map'
import type {
  ImageViewerProps,
  ImageViewerState,
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
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
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
  Viewer?: React.FC<ImageViewerProps> | React.ComponentClass<ImageViewerProps>
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
    footnoteDefinitionsTitle,
    className,
    style,
    rendererMap: customRendererMap,
    codeRunners,
    Viewer,
  } = props
  const [{ visible, activateIndex }, setImageViewerState] =
    useState<ImageViewerState>({
      visible: false,
      activateIndex: -1,
    })
  const [images, setImages] = useState<Array<{ src: string; alt: string }>>([])
  const handleToggleImageVisible = useCallback(() => {
    setImageViewerState(state => ({
      visible: !state.visible,
      activateIndex: state.activateIndex,
    }))
  }, [])

  const rendererMap = useRendererMap(customRendererMap, codeRunners)
  const renderNodes = useMemo<(nodes: YastNode[]) => React.ReactNode[]>(() => {
    const nextImages: PreviewImageItem[] = []
    const previewImageApi: PreviewImageApi = {
      addPreviewImage: ({ src, alt }) => {
        const index: number = nextImages.length
        nextImages.push({ src, alt })
        return visible => setImageViewerState({ visible, activateIndex: index })
      },
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
    return (
      <YozoraFootnotesRenderer nodes={nodes} title={footnoteDefinitionsTitle} />
    )
  }, [renderNodes, footnoteDefinitionsTitle, ast])

  return (
    <div className={cn('yozora-markdown', className)} style={style}>
      <section>{children}</section>
      <footer>{footnotes}</footer>
      {Viewer != null && (
        <Viewer
          visible={visible}
          images={images}
          activeIndex={activateIndex}
          onClose={handleToggleImageVisible}
          onMaskClick={handleToggleImageVisible}
        />
      )}
    </div>
  )
}

Markdown.displayName = 'YozoraMarkdown'
