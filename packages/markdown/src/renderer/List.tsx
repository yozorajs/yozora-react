import type { IList } from '@yozora/ast'
import ListRenderer from '@yozora/react-list'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraList: React.FC<IList> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { ordered, orderType, start, children } = props
  return (
    <ListRenderer ordered={ordered} start={start} orderType={orderType}>
      {renderYozoraNodes(children)}
    </ListRenderer>
  )
}

ListRenderer.displayName = 'ListRenderer'
YozoraList.displayName = 'YozoraList'
export default YozoraList
