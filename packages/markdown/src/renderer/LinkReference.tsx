import type { LinkReference } from '@yozora/ast'
import LinkRenderer from '@yozora/react-link'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraLinkReference(
  linkReference: LinkReference,
): React.ReactElement {
  const { renderYozoraNodes, getDefinition } = useContext(YozoraMarkdownContext)
  const definition = getDefinition(linkReference.identifier)
  const url: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

  return (
    <LinkRenderer url={url} title={title}>
      {renderYozoraNodes(linkReference.children)}
    </LinkRenderer>
  )
}

YozoraLinkReference.displayName = 'YozoraLinkReference'
export default YozoraLinkReference
