import type { ILinkReference } from '@yozora/ast'
import Link from '@yozora/react-link'
import React from 'react'
import { YozoraMarkdownContextType } from '../context/context'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraLinkReferenceRenderer: React.FC<ILinkReference> = props => {
  const { getDefinition } = React.useContext(YozoraMarkdownContextType)
  const definition = getDefinition(props.identifier)
  const url: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

  return (
    <Link url={url} title={title}>
      <YozoraNodesRenderer nodes={props.children} />
    </Link>
  )
}

YozoraLinkReferenceRenderer.displayName = 'YozoraLinkReferenceRenderer'
