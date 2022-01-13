import { useDeepCompareCallback, useDeepCompareMemo } from '@guanghechen/react-hooks'
import type {
  Definition as IDefinition,
  FootnoteDefinition as IFootnoteDefinition,
} from '@yozora/ast'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React from 'react'
import { YozoraMarkdownActionsType } from './context/actions'
import { YozoraMarkdownContextType } from './context/context'
import type { IYozoraMarkdownContext } from './context/context'
import { reducer } from './context/reducer'
import { initializeYozoraMarkdownState } from './context/state'
import type { INodeRendererMap } from './types'
import { useYozoraRendererMap } from './useYozoraRendererMap'

export interface IYozoraMarkdownContextProviderProps {
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
  codeRunners?: ReadonlyArray<ICodeRunnerItem>
  /**
   * custom token renderer map.
   */
  customRendererMap?: Readonly<Partial<INodeRendererMap>>
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
  IYozoraMarkdownContextProviderProps
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
  const footnoteDefinitions: ReadonlyArray<IFootnoteDefinition> = useDeepCompareMemo<
    ReadonlyArray<IFootnoteDefinition>
  >(() => Object.values(footnoteDefinitionMap), [footnoteDefinitionMap])

  const [state, dispatch] = React.useReducer(
    reducer,
    {
      codeRunners: initialCodeRunners,
      footnoteDefinitions,
      darken: initialDarken,
      preferLinenos: initialPreferLinenos,
    },
    initializeYozoraMarkdownState,
  )

  const rendererMap: Readonly<INodeRendererMap> = useYozoraRendererMap(customRendererMap)

  // Get link / image reference definition through the given identifier.
  const getDefinition = useDeepCompareCallback<IYozoraMarkdownContext['getDefinition']>(
    identifier => definitionMap[identifier],
    [definitionMap],
  )

  const context = React.useMemo<IYozoraMarkdownContext>(
    () => ({
      ...state,
      dispatch,
      getDefinition,
      rendererMap,
    }),
    [state, dispatch, getDefinition, rendererMap],
  )

  // Watch initial values change.
  React.useEffect(() => {
    dispatch({
      type: YozoraMarkdownActionsType.RESET_STATE_DATA,
      payload: {
        footnoteDefinitions,
        codeRunners: initialCodeRunners,
        darken: initialDarken,
        preferLinenos: initialPreferLinenos,
      },
    })
  }, [dispatch, footnoteDefinitions, initialCodeRunners, initialDarken, initialPreferLinenos])

  return (
    <YozoraMarkdownContextType.Provider value={context}>
      {children}
    </YozoraMarkdownContextType.Provider>
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
