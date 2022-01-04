import type { ITable } from '@yozora/ast'
import TableRenderer from '@yozora/react-table'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraTable(table: ITable): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { columns, children: rows } = table

  const tableRows: React.ReactNode[][] = rows.map(row =>
    row.children.map(node => renderYozoraNodes(node.children)),
  )
  const [ths, ...tds] = tableRows
  const aligns = columns.map(col => col.align ?? undefined)

  return <TableRenderer aligns={aligns} ths={ths} tds={tds} />
}

YozoraTable.displayName = 'YozoraTable'
export default YozoraTable
