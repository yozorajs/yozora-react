import {
  useDeepCompareCallback,
  useDeepCompareMemo,
} from '@guanghechen/react-hooks'
import type { IDefinition, IFootnoteDefinition, IYastNode } from '@yozora/ast'
import type { CodeRunnerItem } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { TokenRendererMap } from '../types'
import useYozoraRendererMap from '../useYozoraRendererMap'
import { YozoraMarkdownActionsType } from './actions'
import { YozoraMarkdownContext } from './context'
import type { YozoraMarkdownContextState } from './context'
import reducer from './reducer'
import { initializeYozoraMarkdownContextData } from './state'

export interface YozoraMarkdownContextProviderProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap: Readonly<Record<string, IDefinition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap: Readonly<Record<string, IFootnoteDefinition>>
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
   * @default false
   */
  darken?: boolean
  /**
   * Display linenos as the default behavior in YozoraCode components.
   * @default true
   */
  preferLinenos?: boolean
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
export const YozoraMarkdownContextProvider: React.FC<
  YozoraMarkdownContextProviderProps
> = props => {
  const {
    definitionMap,
    footnoteDefinitionMap,
    children,
    codeRunners: initialCodeRunners,
    customRendererMap,
    darken: initialDarken,
    preferLinenos: initialPreferLinenos,
  } = props

  // Get all of footnote reference definitions.
  const footnoteDefinitions: ReadonlyArray<IFootnoteDefinition> =
    useDeepCompareMemo<ReadonlyArray<IFootnoteDefinition>>(
      () => Object.values(footnoteDefinitionMap),
      [footnoteDefinitionMap],
    )

  const [contextData, dispatch] = useReducer(
    reducer,
    {
      codeRunners: initialCodeRunners,
      footnoteDefinitions,
      darken: initialDarken,
      preferLinenos: initialPreferLinenos,
    },
    initializeYozoraMarkdownContextData,
  )

  const rendererMap: Readonly<TokenRendererMap> =
    useYozoraRendererMap(customRendererMap)

  // Render yozora AST nodes into React nodes.
  const renderYozoraNodes = useCallback<
    YozoraMarkdownContextState['renderYozoraNodes']
  >(
    (nodes?: IYastNode[]): React.ReactNode[] => {
      if (nodes == null || nodes.length <= 0) return []
      return nodes.map((node, key) => {
        const Renderer = rendererMap[node.type] ?? rendererMap._fallback
        return <Renderer key={key} {...node} />
      })
    },
    [rendererMap],
  )

  // Get link / image reference definition through the given identifier.
  const getDefinition = useDeepCompareCallback<
    YozoraMarkdownContextState['getDefinition']
  >(identifier => definitionMap[identifier], [definitionMap])

  const context = useMemo<YozoraMarkdownContextState>(
    () => ({
      ...contextData,
      dispatch,
      getDefinition,
      renderYozoraNodes,
    }),
    [contextData, dispatch, getDefinition, renderYozoraNodes],
  )

  // Watch initial values change.
  useEffect(() => {
    dispatch({
      type: YozoraMarkdownActionsType.RESET_STATE_DATA,
      payload: {
        footnoteDefinitions,
        codeRunners: initialCodeRunners,
        darken: initialDarken,
        preferLinenos: initialPreferLinenos,
      },
    })
  }, [
    dispatch,
    footnoteDefinitions,
    initialCodeRunners,
    initialDarken,
    initialPreferLinenos,
  ])

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
  preferLinenos: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

YozoraMarkdownContextProvider.displayName = 'YozoraContextProvider'
export default YozoraMarkdownContextProvider
