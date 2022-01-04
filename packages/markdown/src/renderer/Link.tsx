import type { ILink } from '@yozora/ast'
import LinkRenderer from '@yozora/react-link'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraLink: React.FC<ILink> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { url, title, children } = props

  return (
    <LinkRenderer url={url} title={title}>
      {renderYozoraNodes(children)}
    </LinkRenderer>
  )
}

LinkRenderer.displayName = 'LinkRenderer'
YozoraLink.displayName = 'YozoraLink'
export default YozoraLink
