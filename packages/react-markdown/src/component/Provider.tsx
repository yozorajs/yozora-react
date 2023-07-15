import { cx } from '@emotion/css'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import { CodeType } from '@yozora/ast'
import type { INodeRendererProviderProps } from '@yozora/core-react-renderer'
import { NodeRendererProvider } from '@yozora/core-react-renderer'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React from 'react'
import { useStyles } from '../style'
import type { INodeRendererMap } from './nodeRendererMap'
import { defaultNodeRendererMap } from './nodeRendererMap'
import { createCodeRenderer } from './renderer/code'

export interface IMarkdownProviderProps {
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
  ImageViewer?: INodeRendererProviderProps['ImageViewer']
}

/**
 * A HoC component to provider YozoraMarkdownContext
 */
export const MarkdownProvider: React.FC<IMarkdownProviderProps> = props => {
  const { definitionMap, footnoteDefinitionMap, children, ImageViewer } = props

  const customRendererMap = React.useMemo(
    () => ({
      ...defaultNodeRendererMap,
      [CodeType]: createCodeRenderer(props.codeRunners),
      ...props.customRendererMap,
    }),
    [props.customRendererMap, props.codeRunners],
  )

  const cls: string = cx(useStyles(), props.rootClassName)
  return (
    <NodeRendererProvider
      definitionMap={definitionMap}
      footnoteDefinitionMap={footnoteDefinitionMap}
      customRendererMap={customRendererMap}
      ImageViewer={ImageViewer}
    >
      <div className={cls}>{children}</div>
    </NodeRendererProvider>
  )
}

MarkdownProvider.propTypes = {
  definitionMap: PropTypes.object.isRequired as any,
  footnoteDefinitionMap: PropTypes.object.isRequired as any,
  codeRunners: PropTypes.array,
  customRendererMap: PropTypes.object as any,
  children: PropTypes.node,
  rootClassName: PropTypes.string,
  ImageViewer: PropTypes.any,
}

MarkdownProvider.displayName = 'YozoraMarkdownProvider'
