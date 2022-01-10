import type { IStrong } from '@yozora/ast'
import Strong from '@yozora/react-strong'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraStrongRenderer: React.FC<IStrong> = props => {
  return (
    <Strong>
      <YozoraNodesRenderer nodes={props.children} />
    </Strong>
  )
}

YozoraStrongRenderer.displayName = 'YozoraStrongRenderer'
