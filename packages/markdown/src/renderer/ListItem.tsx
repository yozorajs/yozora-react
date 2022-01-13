import type { ListItem as IListItem } from '@yozora/ast'
import ListItem from '@yozora/react-list-item'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraListItemRenderer: React.FC<IListItem> = props => {
  const { status } = props
  return (
    <ListItem status={status}>
      <YozoraNodesRenderer nodes={props.children} />
    </ListItem>
  )
}

YozoraListItemRenderer.displayName = 'YozoraListItemRenderer'
