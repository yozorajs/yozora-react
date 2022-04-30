import type { Admonition as IAdmonition } from '@yozora/ast'
import { NodesRenderer } from '@yozora/core-react-renderer'
import Admonition from '@yozora/react-admonition'
import React from 'react'

export const YozoraAdmonitionRenderer: React.FC<IAdmonition> = props => {
  const title = props.title.length > 0 ? <NodesRenderer nodes={props.title} /> : undefined
  return (
    <Admonition keyword={props.keyword} title={title}>
      <NodesRenderer nodes={props.children} />
    </Admonition>
  )
}
