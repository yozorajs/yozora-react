import type { ListItem } from '@yozora/ast'
import ListItemRenderer from '@yozora/react-list-item'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraListItem(listItem: ListItem): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { status, children } = listItem
  return (
    <ListItemRenderer status={status}>
      {renderYozoraNodes(children)}
    </ListItemRenderer>
  )
}

YozoraListItem.displayName = 'YozoraListItem'
export default YozoraListItem
