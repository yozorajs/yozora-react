import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultTableCellTheme, getTableCellStyle } from './theme'
export * from './theme'


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


const Container = styled.th`
  padding: ${ getTableCellStyle('padding') };
  border: 1px solid ${ getTableCellStyle('borderColor') };
`


Container.defaultProps = {
  theme: { yozora: { tableCell: defaultTableCellTheme } }
}


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
    const as = isHeader ? 'th' : 'td'

    return (
      <Container as={ as } { ...cellProps } align={ align } ref={ forwardRef }>
        { children }
      </Container>
    )
  }
)


TableCell.displayName = 'TableCell'


TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  isHeader: PropTypes.bool,
  align: PropTypes.oneOf<'left' | 'center' | 'right'>(['left', 'center', 'right']),
}


export default TableCell
