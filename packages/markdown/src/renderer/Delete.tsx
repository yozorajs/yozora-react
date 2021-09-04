import type { Delete } from '@yozora/ast'
import DeleteRenderer from '@yozora/react-delete'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraDelete(_delete: Delete): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return <DeleteRenderer>{renderYozoraNodes(_delete.children)}</DeleteRenderer>
}

YozoraDelete.displayName = 'YozoraDelete'
export default YozoraDelete
