import type { ILink } from '@yozora/ast'
import Link from '@yozora/react-link'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraLinkRenderer: React.FC<ILink> = props => {
  const { url, title } = props
  return (
    <Link url={url} title={title}>
      <YozoraNodesRenderer nodes={props.children} />
    </Link>
  )
}

YozoraLinkRenderer.displayName = 'YozoraLinkRenderer'
