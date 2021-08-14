import type { Definition, FootnoteDefinition, YastNode } from '@yozora/ast'
import type { CodeRunnerItem } from '@yozora/react-code'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  YozoraMarkdownContextData,
  YozoraMarkdownContextState,
} from './Context'
import { YozoraMarkdownContext } from './Context'
import type { TokenRendererMap } from './types'
import useYozoraRendererMap from './useYozoraRendererMap'

export interface YozoraMarkdownContextProviderProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap: Readonly<Record<string, FootnoteDefinition>>
  /**
   * Code runners.
   */
  codeRunners?: ReadonlyArray<CodeRunnerItem>
  /**
   * custom token renderer map.
   */
  customRendererMap?: Readonly<Partial<TokenRendererMap>>
  /**
   * Whether if to enable the dark mode.
   */
  darken?: boolean
  /**
   * Descendant elements.
   */
  children: React.ReactNode
}

/**
 * A HoC component to provider YozoraMarkdownContext
 * @param props
 * @returns
 */
export const YozoraMarkdownContextProvider: React.FC<YozoraMarkdownContextProviderProps> =
  props => {
    const {
      definitionMap,
      footnoteDefinitionMap,
      children,
      codeRunners: initialCodeRunners,
      customRendererMap,
      darken: initialDarken,
    } = props

    const [
      { codeRunners, darken, images, imageViewerVisible, activatedImageIndex },
      setContextData,
    ] = useState<YozoraMarkdownContextData>({
      codeRunners: initialCodeRunners ?? [],
      darken: initialDarken ?? false,
      images: [],
      imageViewerVisible: false,
      activatedImageIndex: -1,
    })

    const rendererMap: Readonly<TokenRendererMap> =
      useYozoraRendererMap(customRendererMap)

    // Render yozora AST nodes into React nodes.
    const renderYozoraNodes = useCallback<
      YozoraMarkdownContextState['renderYozoraNodes']
    >(
      (nodes?: YastNode[]): React.ReactNode[] => {
        if (nodes == null || nodes.length <= 0) return []
        return nodes.map((node, key) => {
          const Renderer = rendererMap[node.type] ?? rendererMap._fallback
          return <Renderer key={key} {...node} />
        })
      },
      [rendererMap],
    )

    // Update the context data.
    const dispatch = useCallback<YozoraMarkdownContextState['dispatch']>(
      data => setContextData(contextData => ({ ...contextData, ...data })),
      [setContextData],
    )

    // Get link / image reference definition through the given identifier.
    const getDefinition = useCallback<
      YozoraMarkdownContextState['getDefinition']
    >(identifier => definitionMap[identifier], [definitionMap])

    // Get footnote reference definition through the give identifier.
    const getFootnoteDefinition = useCallback<
      YozoraMarkdownContextState['getFootnoteDefinition']
    >(identifier => footnoteDefinitionMap[identifier], [footnoteDefinitionMap])

    // Add a preview image item.
    const addPreviewImage = useCallback<
      YozoraMarkdownContextState['addPreviewImage']
    >(
      ({ src, alt }) => {
        let index = 0
        for (const _end = images.length; index < _end; ++index) {
          const item = images[index]
          if (item.src === src && item.alt === alt) break
        }
        if (index === images.length) images.push({ src, alt })

        return (visible = true): void => {
          setContextData(({ codeRunners, darken, images }) => ({
            codeRunners,
            darken,
            images,
            imageViewerVisible: visible,
            activatedImageIndex: index,
          }))
        }
      },
      [dispatch, images],
    )

    const context = useMemo<YozoraMarkdownContextState>(
      () => ({
        codeRunners,
        darken,
        images,
        imageViewerVisible,
        activatedImageIndex,
        dispatch,
        getDefinition,
        getFootnoteDefinition,
        addPreviewImage,
        renderYozoraNodes,
      }),
      [
        codeRunners,
        darken,
        images,
        imageViewerVisible,
        activatedImageIndex,
        dispatch,
        getDefinition,
        getFootnoteDefinition,
        addPreviewImage,
        renderYozoraNodes,
      ],
    )

    // Watch initial values change.
    useEffect(() => {
      setContextData(context => {
        const shouldReset: boolean = codeRunners !== context.codeRunners
        return {
          codeRunners: codeRunners ?? context.codeRunners,
          darken: darken ?? context.darken,
          images: shouldReset ? [] : context.images,
          imageViewerVisible: shouldReset ? false : context.imageViewerVisible,
          activatedImageIndex: shouldReset ? -1 : context.activatedImageIndex,
        }
      })
    }, [definitionMap, footnoteDefinitionMap, codeRunners, darken])

    return (
      <YozoraMarkdownContext.Provider value={context}>
        {children}
      </YozoraMarkdownContext.Provider>
    )
  }

YozoraMarkdownContextProvider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  footnoteDefinitionMap: PropTypes.object.isRequired as any,
  codeRunners: PropTypes.array,
  customRendererMap: PropTypes.object as any,
  darken: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

YozoraMarkdownContextProvider.displayName = 'YozoraContextProvider'
export default YozoraMarkdownContextProvider
