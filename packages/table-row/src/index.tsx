import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultTableRowTheme, getTableRowStyle } from './theme'
export * from './theme'


/**
 * Props for tableRow row
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * tableRow row content
   */
  children: React.ReactNode
}


const Container = styled.tr`
  background: ${ getTableRowStyle('background') };

  &:nth-child(2n) {
    background: ${ getTableRowStyle('evenBackground') };
  }
`


Container.defaultProps = {
  theme: { yozora: { tableRow: defaultTableRowTheme } }
}


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


TableRow.displayName = 'TableRow'


TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}


export default TableRow
