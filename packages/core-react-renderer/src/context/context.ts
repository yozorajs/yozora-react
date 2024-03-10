import { type IComputed, useComputed } from '@guanghechen/react-viewmodel'
import React from 'react'
import type { INodeRendererAction } from './types'
import type { NodeRendererViewModel } from './viewmodel'

export type INodeRendererContext = NodeRendererViewModel

export const NodeRendererContextType = React.createContext<INodeRendererContext>(
  null as unknown as INodeRendererContext,
)
NodeRendererContextType.displayName = 'NodeRendererContextType'

export const useNodeRendererContext = (): INodeRendererContext =>
  React.useContext(NodeRendererContextType)

export const useNodeRendererDispatch = (): React.Dispatch<INodeRendererAction> => {
  const viewmodel = React.useContext(NodeRendererContextType)
  return viewmodel.dispatch
}

export const useNodeRendererState = <D>(
  selector: (viewmodel: NodeRendererViewModel) => IComputed<D>,
): D => {
  const viewmodel = React.useContext(NodeRendererContextType)
  const computed = selector(viewmodel)
  return useComputed(computed)
}
