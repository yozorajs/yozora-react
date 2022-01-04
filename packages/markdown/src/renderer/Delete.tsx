import type { IDelete } from '@yozora/ast'
import DeleteRenderer from '@yozora/react-delete'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraDelete: React.FC<IDelete> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return <DeleteRenderer>{renderYozoraNodes(props.children)}</DeleteRenderer>
}

DeleteRenderer.displayName = 'DeleteRenderer'
YozoraDelete.displayName = 'YozoraDelete'
export default YozoraDelete
