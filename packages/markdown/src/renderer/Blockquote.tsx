import type { Blockquote as IBlockquote } from '@yozora/ast'
import Blockquote from '@yozora/react-blockquote'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraBlockquoteRenderer: React.FC<IBlockquote> = props => {
  return (
    <Blockquote>
      <YozoraNodesRenderer nodes={props.children} />
    </Blockquote>
  )
}

YozoraBlockquoteRenderer.displayName = 'YozoraBlockquoteRenderer'
