import type {
  IComputableValue,
  IComputed,
  IObservableKey,
  IObservableValue,
  IValueMap,
} from '@guanghechen/react-viewmodel'
import { useComputed, useSelect, useSelectAccurately } from '@guanghechen/react-viewmodel'
import React from 'react'
import type { INodeRendererAction } from './types'
import type { NodeRendererViewModel } from './viewmodel'

export type INodeRendererContext = NodeRendererViewModel

export const NodeRendererContextType = React.createContext<INodeRendererContext>(
  null as unknown as INodeRendererContext,
)
NodeRendererContextType.displayName = 'NodeRendererContextType'

export const useNodeRendererSelect = <D extends IObservableValue>(
  selector: (valueMap: IValueMap<NodeRendererViewModel>) => D,
  equals?: (prev: D, next: D) => boolean,
): D => {
  const store = React.useContext(NodeRendererContextType)
  return useSelect<NodeRendererViewModel, D>(store, selector, equals)
}

export const useNodeRendererSelectAccurately = <
  D extends IObservableValue,
  K extends IObservableKey<NodeRendererViewModel>,
>(
  keys: K[],
  selector: (valueMap: Pick<IValueMap<NodeRendererViewModel>, K>) => D,
  equals?: (prev: D, next: D) => boolean,
): D => {
  const store = React.useContext(NodeRendererContextType)
  return useSelectAccurately<NodeRendererViewModel, K, D>(store, keys, selector, equals)
}

export const useNodeRendererDispatch = (): React.Dispatch<INodeRendererAction> => {
  const store = React.useContext(NodeRendererContextType)
  return store.dispatch
}

export const useNodeRendererState = <D extends IComputableValue>(
  selector: (viewmodel: NodeRendererViewModel) => IComputed<D>,
): D => {
  const store = React.useContext(NodeRendererContextType)
  const computed = selector(store)
  return useComputed(computed)
}
