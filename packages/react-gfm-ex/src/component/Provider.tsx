import type { IMarkdownProviderProps as ICoreMarkdownProviderProps } from '@yozora/react'
import { MarkdownProvider as CoreMarkdownProvider } from '@yozora/react'
import React from 'react'
import { defaultNodeRendererMap } from './nodeRendererMap'

export type IMarkdownProviderProps = Omit<ICoreMarkdownProviderProps, 'rendererMap'>

export const MarkdownProvider: React.FC<IMarkdownProviderProps> = props => (
  <CoreMarkdownProvider {...props} rendererMap={defaultNodeRendererMap} />
)
