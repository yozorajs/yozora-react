import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import './styled-components'
import { defaultTableRowTheme, getTableRowStyle } from './theme'

export * from './theme'

/**
 * Props for tableRow row
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * tableRow row content
   */
  children: React.ReactNode
}

/**
 *
 * @param props
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, forwardRef): React.ReactElement => {
    return <Container {...props} ref={forwardRef} />
  },
)

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}

TableRow.displayName = 'YozoraTableRow'
export default TableRow

const Container = styled.tr`
  background: ${getTableRowStyle('background')};

  &:nth-child(2n) {
    background: ${getTableRowStyle('evenBackground')};
  }
`

Container.defaultProps = {
  theme: { yozora: { tableRow: defaultTableRowTheme } },
}

export const TableRowClasses = {
  container: `${Container}`,
}
