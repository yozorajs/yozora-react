import type { List } from '@yozora/ast'
import ListRenderer from '@yozora/react-list'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraList(list: List): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { ordered, orderType, start, children } = list
  return (
    <ListRenderer ordered={ordered} start={start} orderType={orderType}>
      {renderYozoraNodes(children)}
    </ListRenderer>
  )
}

YozoraList.displayName = 'YozoraList'
export default YozoraList
