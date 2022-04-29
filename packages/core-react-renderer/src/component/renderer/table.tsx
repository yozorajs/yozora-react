import type { Table } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `table`, `tableRow` and `tableCell`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#table
 * @see https://www.npmjs.com/package/@yozora/ast#tablecell
 * @see https://www.npmjs.com/package/@yozora/ast#tablerow
 * @see https://www.npmjs.com/package/@yozora/tokenizer-table
 * @see https://www.npmjs.com/package/@yozora/tokenizer-table-row
 * @see https://www.npmjs.com/package/@yozora/tokenizer-table-cell
 */
export const TableRenderer: React.FC<Table> = props => {
  const { columns, children: rows } = props

  const tableRows: React.ReactNode[][] = rows.map(row =>
    row.children.map((cell, idx) => <NodesRenderer key={idx} nodes={cell.children} />),
  )
  const [ths, ...tds] = tableRows
  const aligns = columns.map(col => col.align ?? undefined)

  const headRowRef = React.useRef<HTMLTableRowElement>(null)

  // Set title attribute.
  React.useEffect(() => {
    if (headRowRef.current == null) return
    const ths = headRowRef.current.children
    for (let i = 0; i < ths.length; ++i) {
      const th = ths[i] as HTMLTableCellElement
      th.setAttribute('title', th.innerText)
    }
  }, [headRowRef])

  return (
    <table className="yozora-table">
      <thead>
        <tr ref={headRowRef}>
          {ths.map((children, cellIndex) => (
            <th key={cellIndex} align={aligns[cellIndex]}>
              {children}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tds.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((children, cellIndex) => (
              <td key={cellIndex} align={aligns[cellIndex]}>
                {children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
