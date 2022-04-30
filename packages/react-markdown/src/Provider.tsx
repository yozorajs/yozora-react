import { cx } from '@emotion/css'
import type {
  Definition as IDefinition,
  FootnoteDefinition as IFootnoteDefinition,
} from '@yozora/ast'
import type { INodeRendererContextProviderProps, INodeStyleMap } from '@yozora/core-react-renderer'
import { NodeRendererContextProvider } from '@yozora/core-react-renderer'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React from 'react'
import { YozoraMarkdownContextType } from './context/context'
import type { IYozoraMarkdownContext } from './context/context'
import { reducer } from './context/reducer'
import { initYozoraMarkdownState } from './context/state'
import { defaultNodeRendererMap } from './nodeRendererMap'
import { useStyles } from './style/style'
import type { INodeRendererMap } from './types'

export interface IMarkdownContextProviderProps {
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
   * Custom token style map.
   */
  customStyleMap?: Readonly<Partial<INodeStyleMap>>
  /**
   * Descendant elements.
   */
  children?: React.ReactNode
  /**
   * Root element className.
   */
  rootClassName?: string
  /**
   * Custom image viewer.
   */
  ImageViewer?: INodeRendererContextProviderProps['ImageViewer']
}

/**
 * A HoC component to provider YozoraMarkdownContext
 * @param props
 * @returns
 */
export const Provider: React.FC<IMarkdownContextProviderProps> = props => {
  const { definitionMap, footnoteDefinitionMap, children } = props

  const customRendererMap = React.useMemo(
    () => ({ ...defaultNodeRendererMap, ...props.customRendererMap }),
    [props.customRendererMap],
  )

  const [state, dispatch] = React.useReducer(
    reducer,
    { codeRunners: props.codeRunners },
    initYozoraMarkdownState,
  )

  const context = React.useMemo<IYozoraMarkdownContext>(
    () => ({ ...state, dispatch }),
    [state, dispatch],
  )

  const rootClassName: string = cx(useStyles(), props.rootClassName)
  return (
    <YozoraMarkdownContextType.Provider value={context}>
      <NodeRendererContextProvider
        definitionMap={definitionMap}
        footnoteDefinitionMap={footnoteDefinitionMap}
        customRendererMap={customRendererMap}
        customStyleMap={props.customStyleMap}
        rootClassName={rootClassName}
      >
        {children}
      </NodeRendererContextProvider>
    </YozoraMarkdownContextType.Provider>
  )
}

Provider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  footnoteDefinitionMap: PropTypes.object.isRequired as any,
  codeRunners: PropTypes.array,
  customRendererMap: PropTypes.object as any,
  customStyleMap: PropTypes.object as any,
  children: PropTypes.node,
  rootClassName: PropTypes.string,
  ImageViewer: PropTypes.any,
}

Provider.displayName = 'YozoraMarkdownProvider'
