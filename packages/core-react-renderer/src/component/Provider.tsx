import isEqual from '@guanghechen/fast-deep-equal'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import PropTypes from 'prop-types'
import React from 'react'
import { NodeRendererViewModel } from '../context'
import { NodeRendererContextType } from '../context/context'
import type { INodeRendererMap } from '../types'
import { buildNodeRendererMap } from '../util/rendererMap'
import { ImagePreviewer } from './ImagePreviewer'
import type { IImagePreviewerProps } from './ImagePreviewer'

export interface INodeRendererProviderProps {
  /**
   * Link / Image reference definitions.
   */
  definitionMap?: Readonly<Record<string, Definition>>
  /**
   * Footnote reference definitions.
   */
  footnoteDefinitionMap?: Readonly<Record<string, FootnoteDefinition>>
  /**
   * Custom token renderer map.
   */
  customRendererMap?: Readonly<Partial<INodeRendererMap>>
  /**
   * Determine if show code line number.
   * @default true
   */
  showCodeLineno?: boolean
  /**
   * Descendant elements.
   */
  children?: React.ReactNode
  /**
   * Custom image viewer.
   */
  ImageViewer?: IImagePreviewerProps['ImageViewer']
}

interface IState {
  viewmodel: NodeRendererViewModel
}

export class NodeRendererProvider extends React.Component<INodeRendererProviderProps, IState> {
  public static readonly displayName = 'NodeRendererProvider'
  public static readonly propTypes = {
    definitionMap: PropTypes.object as any,
    footnoteDefinitionMap: PropTypes.object as any,
    customRendererMap: PropTypes.object as any,
    showCodeLineno: PropTypes.bool,
    children: PropTypes.node,
    ImageViewer: PropTypes.any,
  }

  constructor(props: INodeRendererProviderProps) {
    super(props)

    const { showCodeLineno = true, definitionMap = {}, footnoteDefinitionMap = {} } = props
    const rendererMap: Readonly<INodeRendererMap> = buildNodeRendererMap(props.customRendererMap)
    const viewmodel = new NodeRendererViewModel({
      images: [],
      imageViewerVisible: false,
      imageActivatedIndex: -1,
      showCodeLineno,
      rendererMap,
      definitionMap,
      footnoteDefinitionMap,
    })
    this.state = { viewmodel }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<INodeRendererProviderProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.viewmodel !== nextState.viewmodel ||
      props.showCodeLineno !== nextProps.showCodeLineno ||
      props.children !== nextProps.children ||
      props.ImageViewer !== nextProps.ImageViewer ||
      !isEqual(props.definitionMap, nextProps.definitionMap) ||
      !isEqual(props.footnoteDefinitionMap, nextProps.footnoteDefinitionMap) ||
      !isEqual(props.customRendererMap, nextProps.customRendererMap)
    )
  }

  public override render(): React.ReactElement {
    const { children, ImageViewer } = this.props
    const { viewmodel } = this.state

    return (
      <NodeRendererContextType.Provider value={viewmodel}>
        {children}
        <ImagePreviewer ImageViewer={ImageViewer} />
      </NodeRendererContextType.Provider>
    )
  }

  public override componentDidUpdate(prevProps: Readonly<INodeRendererProviderProps>): void {
    const props = this.props
    const vm = this.state.viewmodel

    if (props.showCodeLineno !== prevProps.showCodeLineno) {
      const nextShowCodeLineno: boolean = props.showCodeLineno ?? true
      vm.showCodeLineno$.next(nextShowCodeLineno)
    }

    if (!isEqual(props.definitionMap, prevProps.definitionMap)) {
      const nextDefinitionMap: Readonly<Record<string, Definition>> = props.definitionMap ?? {}
      vm.definitionMap$.next(nextDefinitionMap)
    }

    if (!isEqual(props.footnoteDefinitionMap, prevProps.footnoteDefinitionMap)) {
      const nextFootnoteDefinitionMap: Readonly<Record<string, FootnoteDefinition>> =
        props.footnoteDefinitionMap ?? {}
      vm.footnoteDefinitionMap$.next(nextFootnoteDefinitionMap)
    }

    if (!isEqual(props.customRendererMap, prevProps.customRendererMap)) {
      const nextRendererMap: Readonly<INodeRendererMap> = buildNodeRendererMap(
        props.customRendererMap,
      )
      vm.rendererMap$.next(nextRendererMap)
    }
  }

  public override componentWillUnmount(): void {
    const vm = this.state.viewmodel
    if (!vm.disposed) {
      console.log('[waw] unmounting yozora-code-renderer viewmodel.')
      vm.dispose()
    }
  }
}
