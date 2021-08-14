import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import { collectFootnoteDefinitions } from '@yozora/ast-util'
import type { CodeRunnerItem } from '@yozora/react-code'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import type { FootnoteItem } from '@yozora/react-footnote-definitions'
import cn from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { YozoraMarkdownContextData } from './Context'
import { YozoraMarkdownContext, initialYozoraMarkdownContext } from './Context'
import type { ImageViewerProps, TokenRendererMap } from './types'
import useYozoraNodesRenderer from './useYozoraNodesRenderer'

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
   * Enable dark theme.
   */
  darken?: boolean
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
    darken,
    className,
    style,
    rendererMap: customRendererMap,
    codeRunners,
    Viewer,
  } = props

  const [imageActivatedIndex, setImageActivatedIndex] = useState<number>(-1)
  const renderNodes = useYozoraNodesRenderer({
    definitionMap,
    footnoteDefinitionMap,
    customRendererMap,
    codeRunners,
    setImageActivatedIndex,
  })

  const handleCloseImageViewer = useCallback<() => void>(() => {
    setImageActivatedIndex(-1)
  }, [])

  const { nodes: children, images } = useMemo(
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

  // Markdown context.
  const [context, setContext] = useState<YozoraMarkdownContextData>(
    initialYozoraMarkdownContext,
  )
  useEffect(() => {
    if (darken === undefined) return
    setContext({ darken })
  }, [darken])

  return (
    <YozoraMarkdownContext.Provider value={context}>
      <div className={cn('yozora-markdown', className)} style={style}>
        <section>{children}</section>
        <footer>{footnotes}</footer>
        {Viewer != null && (
          <Viewer
            visible={imageActivatedIndex >= 0}
            images={images}
            activeIndex={
              imageActivatedIndex < 0 ? undefined : imageActivatedIndex
            }
            onClose={handleCloseImageViewer}
            onMaskClick={handleCloseImageViewer}
          />
        )}
      </div>
    </YozoraMarkdownContext.Provider>
  )
}

Markdown.displayName = 'YozoraMarkdown'
