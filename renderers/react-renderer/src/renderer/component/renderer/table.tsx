import { isEqual } from '@guanghechen/equal'
import type { Table } from '@yozora/ast'
import React from 'react'
import { useNodeRendererState } from '../../context'
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
      <TableFrame>
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
      </TableFrame>
    )
  }
}

function TableFrame({ children }: React.PropsWithChildren): React.ReactElement {
  const showColumnLines = useNodeRendererState(store => store.showTableColumnLines$)
  return (
    <div className="yozora-table-scroll">
      <table className={cls} data-column-lines={showColumnLines}>
        {children}
      </table>
    </div>
  )
}

interface IThProps {
  align: 'left' | 'center' | 'right' | undefined
  children: React.ReactNode
}

class Th extends React.Component<IThProps> {
  protected readonly ref: React.RefObject<HTMLTableCellElement | null>

  public constructor(props: IThProps) {
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

const cls: string = 'yozora-table yozora-table__root'
