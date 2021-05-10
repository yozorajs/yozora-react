import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface TableProps {
  /**
   * Table column configs.
   */
  aligns: Array<'left' | 'right' | 'center' | undefined>
  /**
   * Table cells in thead.
   */
  ths: React.ReactNode[]
  /**
   * Table cells in tbody.
   */
  tds: React.ReactNode[][]
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

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
export function Table(props: TableProps): React.ReactElement {
  const { aligns, className, style, ths, tds } = props

  return (
    <table className={cn('yozora-table', className)} style={style}>
      <thead className="yozora-table__head">
        <tr className="yozora-table-row">
          {ths.map((children, cellIndex) => (
            <th
              key={cellIndex}
              align={aligns[cellIndex]}
              className="yozora-table-cell"
            >
              {children}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="yozora-table__tbody">
        {tds.map((row, rowIndex) => (
          <tr key={rowIndex} className="yozora-table-row">
            {row.map((children, cellIndex) => (
              <td
                key={cellIndex}
                align={aligns[cellIndex]}
                className="yozora-table-cell"
              >
                {children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  aligns: PropTypes.array.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  tds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired as any,
  ths: PropTypes.arrayOf(PropTypes.node).isRequired,
}

Table.displayName = 'YozoraTable'
export default Table
