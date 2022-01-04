import type { ILinkReference } from '@yozora/ast'
import LinkRenderer from '@yozora/react-link'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraLinkReference: React.FC<ILinkReference> = props => {
  const { renderYozoraNodes, getDefinition } = useContext(YozoraMarkdownContext)
  const definition = getDefinition(props.identifier)
  const url: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

  return (
    <LinkRenderer url={url} title={title}>
      {renderYozoraNodes(props.children)}
    </LinkRenderer>
  )
}

LinkRenderer.displayName = 'LinkRenderer'
YozoraLinkReference.displayName = 'YozoraLinkReference'
export default YozoraLinkReference
