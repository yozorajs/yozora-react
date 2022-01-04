import type { IListItem } from '@yozora/ast'
import ListItemRenderer from '@yozora/react-list-item'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraListItem: React.FC<IListItem> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { status, children } = props
  return (
    <ListItemRenderer status={status}>
      {renderYozoraNodes(children)}
    </ListItemRenderer>
  )
}

ListItemRenderer.displayName = 'ListItemRenderer'
YozoraListItem.displayName = 'YozoraListItem'
export default YozoraListItem
