import type { IAdmonition } from '@yozora/ast'
import Admonition from '@yozora/react-admonition'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraAdmonitionRenderer: React.FC<IAdmonition> = props => {
  return (
    <Admonition keyword={props.keyword} title={<YozoraNodesRenderer nodes={props.title} />}>
      <YozoraNodesRenderer nodes={props.children} />
    </Admonition>
  )
}

YozoraAdmonitionRenderer.displayName = 'YozoraAdmonitionRenderer'
