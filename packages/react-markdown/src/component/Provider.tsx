import { cx } from '@emotion/css'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import { CodeType } from '@yozora/ast'
import type { INodeRendererContextProviderProps, INodeStyleMap } from '@yozora/core-react-renderer'
import { NodeRendererContextProvider } from '@yozora/core-react-renderer'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React from 'react'
import { useStyles } from '../style'
import type { INodeRendererMap } from './nodeRendererMap'
import { defaultNodeRendererMap } from './nodeRendererMap'
import { createCodeRenderer } from './renderer/code'

export interface IMarkdownContextProviderProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap?: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap?: Readonly<Record<string, FootnoteDefinition>>
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
export const MarkdownContextProvider: React.FC<IMarkdownContextProviderProps> = props => {
  const { definitionMap, footnoteDefinitionMap, children } = props

  const customRendererMap = React.useMemo(
    () => ({
      ...defaultNodeRendererMap,
      [CodeType]: createCodeRenderer(props.codeRunners),
      ...props.customRendererMap,
    }),
    [props.customRendererMap, props.codeRunners],
  )

  const rootClassName: string = cx(useStyles(), props.rootClassName)
  return (
    <NodeRendererContextProvider
      definitionMap={definitionMap}
      footnoteDefinitionMap={footnoteDefinitionMap}
      customRendererMap={customRendererMap}
      customStyleMap={props.customStyleMap}
      rootClassName={rootClassName}
    >
      {children}
    </NodeRendererContextProvider>
  )
}

MarkdownContextProvider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  footnoteDefinitionMap: PropTypes.object.isRequired as any,
  codeRunners: PropTypes.array,
  customRendererMap: PropTypes.object as any,
  customStyleMap: PropTypes.object as any,
  children: PropTypes.node,
  rootClassName: PropTypes.string,
  ImageViewer: PropTypes.any,
}

MarkdownContextProvider.displayName = 'YozoraMarkdownContextProvider'
