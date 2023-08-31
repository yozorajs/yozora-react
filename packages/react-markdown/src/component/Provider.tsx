import isEqual from '@guanghechen/fast-deep-equal'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import { CodeType } from '@yozora/ast'
import type { INodeRendererProviderProps } from '@yozora/core-react-renderer'
import { NodeRendererProvider } from '@yozora/core-react-renderer'
import type { ICodeRunnerItem } from '@yozora/core-react-types'
import PropTypes from 'prop-types'
import React from 'react'
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
   * Determine if show code line number.
   */
  showCodeLineno?: boolean
  /**
   * Descendant elements.
   */
  children?: React.ReactNode
  /**
   * Custom image viewer.
   */
  ImageViewer?: INodeRendererProviderProps['ImageViewer']
}

interface IState {
  customRendererMap: Readonly<Partial<INodeRendererMap>>
}

/**
 * A HoC component to provider YozoraMarkdownContext
 */
export class MarkdownProvider extends React.Component<IMarkdownProviderProps, IState> {
  public static readonly displayName = 'MarkdownProvider'
  public static readonly propTypes = {
    definitionMap: PropTypes.object.isRequired as any,
    footnoteDefinitionMap: PropTypes.object.isRequired as any,
    codeRunners: PropTypes.array,
    customRendererMap: PropTypes.object as any,
    showCodeLineno: PropTypes.bool,
    children: PropTypes.node,
    ImageViewer: PropTypes.any,
  }

  constructor(props: IMarkdownProviderProps) {
    super(props)

    this.state = {
      customRendererMap: buildCustomRendererMap(props.codeRunners, props.customRendererMap),
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IMarkdownProviderProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.customRendererMap !== nextState.customRendererMap ||
      props.showCodeLineno !== nextProps.showCodeLineno ||
      props.children !== nextProps.children ||
      props.ImageViewer !== nextProps.ImageViewer ||
      !isEqual(props.definitionMap, nextProps.definitionMap) ||
      !isEqual(props.footnoteDefinitionMap, nextProps.footnoteDefinitionMap) ||
      !isEqual(props.codeRunners, nextProps.codeRunners) ||
      !isEqual(props.customRendererMap, nextProps.customRendererMap)
    )
  }

  public override render(): React.ReactElement {
    const {
      definitionMap, //
      footnoteDefinitionMap,
      showCodeLineno,
      children,
      ImageViewer,
    } = this.props
    const { customRendererMap } = this.state

    return (
      <NodeRendererProvider
        definitionMap={definitionMap}
        footnoteDefinitionMap={footnoteDefinitionMap}
        customRendererMap={customRendererMap}
        showCodeLineno={showCodeLineno}
        ImageViewer={ImageViewer}
      >
        {children}
      </NodeRendererProvider>
    )
  }

  public override componentDidUpdate(prevProps: Readonly<IMarkdownProviderProps>): void {
    const props = this.props
    if (
      !isEqual(props.codeRunners, prevProps.codeRunners) ||
      !isEqual(props.customRendererMap, prevProps.customRendererMap)
    ) {
      const nextCustomRendererMap: Readonly<Partial<INodeRendererMap>> = buildCustomRendererMap(
        props.codeRunners,
        props.customRendererMap,
      )
      this.setState({ customRendererMap: nextCustomRendererMap })
    }
  }
}

function buildCustomRendererMap(
  codeRunners: ReadonlyArray<ICodeRunnerItem> | undefined,
  customRendererMap: Readonly<Partial<INodeRendererMap>> | undefined,
): Readonly<Partial<INodeRendererMap>> {
  const rendererMap: Readonly<Partial<INodeRendererMap>> = {
    ...defaultNodeRendererMap,
    [CodeType]: createCodeRenderer(codeRunners),
    ...customRendererMap,
  }
  return rendererMap
}
