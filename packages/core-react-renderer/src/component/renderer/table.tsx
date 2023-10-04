import { css, cx } from '@emotion/css'
import { isEqual } from '@guanghechen/equal'
import type { Table } from '@yozora/ast'
import { tokens } from '@yozora/core-react-constant'
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
export class TableRenderer extends React.Component<Table> {
  public override shouldComponentUpdate(nextProps: Readonly<Table>): boolean {
    const props = this.props
    return (
      !isEqual(props.columns, nextProps.columns) || !isEqual(props.children, nextProps.children)
    )
  }

  public override render(): React.ReactElement {
    const { columns, children: rows } = this.props
    const aligns = columns.map(col => col.align ?? undefined)
    const [ths, ...tds] = rows.map(row =>
      row.children.map((cell, idx) => <NodesRenderer key={idx} nodes={cell.children} />),
    )
    return (
      <table className={cls}>
        <thead>
          <tr>
            {ths.map((children, idx) => (
              <Th key={idx} align={aligns[idx]}>
                {children}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tds.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((children, idx) => (
                <td key={idx} align={aligns[idx]}>
                  {children}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

interface IThProps {
  align: 'left' | 'center' | 'right' | undefined
  children: React.ReactNode
}

class Th extends React.Component<IThProps> {
  protected readonly ref: React.RefObject<HTMLTableCellElement>

  constructor(props: IThProps) {
    super(props)
    this.ref = { current: null }
  }

  public override shouldComponentUpdate(nextProps: Readonly<IThProps>): boolean {
    const props = this.props
    return props.align !== nextProps.align || props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const { align, children } = this.props
    return (
      <th ref={this.ref} align={align}>
        {children}
      </th>
    )
  }

  public override componentDidMount(): void {
    const th = this.ref.current
    if (th) {
      th.setAttribute('title', th.innerText)
    }
  }

  public override componentDidUpdate(): void {
    const th = this.ref.current
    if (th) {
      th.setAttribute('title', th.innerText)
    }
  }
}

const cls: string = cx(
  '.yozora-table',
  css({
    display: 'block',
    overflow: 'auto',
    width: 'max-content',
    maxWidth: '100%',
    padding: 0,
    borderCollapse: 'collapse',
    borderRadius: '6px',
    borderSpacing: 0,
    border: `1px solid ${tokens.colorBorderTable}`,
    margin: '0 auto 1.25em',
    lineHeight: 1.6,
    '> thead': {
      backgroundColor: tokens.colorBgTableHead,
      borderBottom: '1px solid #f0f0f0',
      th: {
        padding: '0.5rem 1rem',
        borderLeft: `1px solid ${tokens.colorBorderTable}`,
        wordBreak: 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:first-child': {
          borderLeft: 'none',
        },
      },
    },
    '> tbody': {
      tr: {
        borderTop: `1px solid ${tokens.colorBorderTable}`,
        backgroundColor: tokens.colorBgTableOddRow,
      },
      'tr:nth-child(2n)': {
        backgroundColor: tokens.colorBgTableEvenRow,
      },
      td: {
        padding: '0.5rem 1rem',
        borderLeft: `1px solid ${tokens.colorBorderTable}`,
        '&:first-child': {
          borderLeft: 'none',
        },
      },
    },
  }),
)
