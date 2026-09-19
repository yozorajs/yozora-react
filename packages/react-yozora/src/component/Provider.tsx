import { isEqual } from '@guanghechen/equal'
import { CodeType } from '@yozora/ast'
import type { IMarkdownProviderProps as ICoreMarkdownProviderProps } from '@yozora/react'
import { MarkdownProvider as CoreMarkdownProvider } from '@yozora/react'
import type { ICodeRunnerItem } from '@yozora/react-renderer'
import React from 'react'
import type { INodeRendererMap } from './nodeRendererMap'
import { defaultNodeRendererMap } from './nodeRendererMap'
import { createCodeRenderer } from './renderer/code'

export interface IMarkdownProviderProps
  extends Omit<ICoreMarkdownProviderProps, 'rendererMap' | 'customRendererMap'> {
  codeRunners?: ReadonlyArray<ICodeRunnerItem>
  customRendererMap?: Readonly<Partial<INodeRendererMap>>
}

interface IState {
  codeRunners: ReadonlyArray<ICodeRunnerItem> | undefined
  rendererMap: Readonly<INodeRendererMap>
}

export class MarkdownProvider extends React.Component<IMarkdownProviderProps, IState> {
  public static readonly displayName = 'MarkdownProvider'

  public constructor(props: IMarkdownProviderProps) {
    super(props)
    this.state = {
      codeRunners: props.codeRunners,
      rendererMap: buildRendererMap(props.codeRunners),
    }
  }

  public static getDerivedStateFromProps(
    props: IMarkdownProviderProps,
    state: IState,
  ): IState | null {
    /** Equivalent runner arrays must not create a new component type and reset live preview state. */
    if (isEqual(props.codeRunners, state.codeRunners)) return null
    return {
      codeRunners: props.codeRunners,
      rendererMap: buildRendererMap(props.codeRunners),
    }
  }

  public override render(): React.ReactElement {
    const { codeRunners: _codeRunners, ...rest } = this.props
    return <CoreMarkdownProvider {...rest} rendererMap={this.state.rendererMap} />
  }
}

function buildRendererMap(
  codeRunners: ReadonlyArray<ICodeRunnerItem> | undefined,
): Readonly<INodeRendererMap> {
  return codeRunners === undefined
    ? defaultNodeRendererMap
    : { ...defaultNodeRendererMap, [CodeType]: createCodeRenderer(codeRunners) }
}
