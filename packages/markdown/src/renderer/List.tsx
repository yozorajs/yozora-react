import type { IList } from '@yozora/ast'
import List from '@yozora/react-list'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraListRenderer: React.FC<IList> = props => {
  const { ordered, orderType, start } = props
  return (
    <List ordered={ordered} start={start} orderType={orderType}>
      <YozoraNodesRenderer nodes={props.children} />
    </List>
  )
}

YozoraListRenderer.displayName = 'YozoraListRenderer'
