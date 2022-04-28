import type { Admonition as IAdmonition } from '@yozora/ast'
import Admonition from '@yozora/react-admonition'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraAdmonitionRenderer: React.FC<IAdmonition> = props => {
  const title = props.title.length > 0 ? <YozoraNodesRenderer nodes={props.title} /> : undefined
  return (
    <Admonition keyword={props.keyword} title={title}>
      <YozoraNodesRenderer nodes={props.children} />
    </Admonition>
  )
}

YozoraAdmonitionRenderer.displayName = 'YozoraAdmonitionRenderer'
