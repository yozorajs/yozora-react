import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for table row
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Table row content
   */
  children: React.ReactNode
}


const Container = styled.tr`
`


/**
 *
 * @param props
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)



TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}


TableRow.displayName = 'TableRow'


export default TableRow
