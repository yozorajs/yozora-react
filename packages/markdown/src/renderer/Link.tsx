import type { Link } from '@yozora/ast'
import LinkRenderer from '@yozora/react-link'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraLink(link: Link): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { url, title, children } = link

  return (
    <LinkRenderer url={url} title={title}>
      {renderYozoraNodes(children)}
    </LinkRenderer>
  )
}

YozoraLink.displayName = 'YozoraLink'
export default YozoraLink
