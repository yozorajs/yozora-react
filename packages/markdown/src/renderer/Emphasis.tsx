import type { Emphasis as IEmphasis } from '@yozora/ast'
import Emphasis from '@yozora/react-emphasis'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraEmphasisRenderer: React.FC<IEmphasis> = props => {
  return (
    <Emphasis>
      <YozoraNodesRenderer nodes={props.children} />
    </Emphasis>
  )
}

YozoraEmphasisRenderer.displayName = 'YozoraEmphasisRenderer'
