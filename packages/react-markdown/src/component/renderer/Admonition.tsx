import type { Admonition } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { NodesRenderer } from '@yozora/core-react-renderer'
import AdmonitionRenderer from '@yozora/react-admonition'
import React from 'react'

export const YozoraAdmonitionRenderer: INodeRenderer<Admonition> = props => {
  const title = props.title.length > 0 ? <NodesRenderer nodes={props.title} /> : undefined
  return (
    <AdmonitionRenderer keyword={props.keyword} title={title}>
      <NodesRenderer nodes={props.children} />
    </AdmonitionRenderer>
  )
}
