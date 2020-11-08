import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for table
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Table head
   */
  head: React.ReactNode
  /**
   * Table body
   */
  body?: React.ReactNode
}


const Container = styled.table`
  display: block;
  width: var(--md-table-width, max-content);
  max-width: 100%;
  overflow: var(--md-table-overflow, auto);
  margin: var(--md-table-margin, 0 0 1rem);
  border-spacing: 0;
  border-collapse: collapse;
`


const THead = styled.thead`
  box-sizing: border-box;
`


const TBody = styled.tbody`
  box-sizing: border-box;
  tr {
    background: var(--md-table-row-bg)
  }
  tr:nth-child(2n) {
    background: var(--md-table-row-even-bg)
  }
`


/**
 *
 * @param props
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, forwardRef): React.ReactElement => {
    const { head, body, children, ...tableProps } = props
    return (
      <Container { ...tableProps } ref={ forwardRef }>
        <THead>{ head }</THead>
        <TBody>{ body }</TBody>
      </Container>
    )
  }
)


Table.propTypes = {
  head: PropTypes.node.isRequired,
  body: PropTypes.node,
}


Table.displayName = 'Table'


export default Table
