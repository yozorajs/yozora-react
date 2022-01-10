import type { ITable } from '@yozora/ast'
import Table from '@yozora/react-table'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraTableRenderer: React.FC<ITable> = props => {
  const { columns, children: rows } = props

  const tableRows: React.ReactNode[][] = rows.map(row =>
    row.children.map((cell, idx) => <YozoraNodesRenderer key={idx} nodes={cell.children} />),
  )
  const [ths, ...tds] = tableRows
  const aligns = columns.map(col => col.align ?? undefined)

  return <Table aligns={aligns} ths={ths} tds={tds} />
}

YozoraTableRenderer.displayName = 'YozoraTableRenderer'
