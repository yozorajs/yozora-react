import type { Delete as IDelete } from '@yozora/ast'
import Delete from '@yozora/react-delete'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraDeleteRenderer: React.FC<IDelete> = props => {
  return (
    <Delete>
      <YozoraNodesRenderer nodes={props.children} />
    </Delete>
  )
}

YozoraDeleteRenderer.displayName = 'YozoraDeleteRenderer'
