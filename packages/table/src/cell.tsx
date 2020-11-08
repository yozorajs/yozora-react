import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for table cell
 */
export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableDataCellElement | HTMLTableHeaderCellElement> {
  /**
   * Content of the table cell
   */
  children: React.ReactNode
  /**
   * Whether is the table header cell
   */
  isHeader?: boolean
  /**
   * Table cell content align
   */
  align?: 'left' | 'center' | 'right'
}


const TH = styled.th`
  padding: var(--md-table-cell-padding, 0.4rem 0.8rem);
  border: 1px solid var(--md-table-border-color);
`


const TD = styled.td`
  padding: var(--md-table-cell-padding, 0.4rem 0.8rem);
  border: 1px solid var(--md-table-border-color);
`


/**
 *
 * @param props
 */
export const TableCell = React.forwardRef<
  HTMLTableDataCellElement | HTMLTableHeaderCellElement,
  TableCellProps
>(
  (props, forwardRef): React.ReactElement => {
    const { children, isHeader = false, align = 'center', ...cellProps } = props
    const T = isHeader ? TH : TD

    return (
      <T { ...cellProps } align={ align } ref={ forwardRef }>
        { children }
      </T>
    )
  }
)



TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  isHeader: PropTypes.bool,
  align: PropTypes.oneOf<'left' | 'center' | 'right'>(['left', 'center', 'right']),
}


TableCell.displayName = 'TableCell'


export default TableCell
