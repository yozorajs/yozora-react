import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import './styled-components'
import { defaultTableTheme, getTableStyle } from './theme'

export * from './theme'

/**
 * Props for table
 */
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode[]
}

/**
 *
 * @param props
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, ...htmlProps } = props
    const [headRows, ...bodyRows] = children
    return (
      <Container {...htmlProps} ref={forwardRef}>
        <thead>{headRows}</thead>
        <tbody>{bodyRows}</tbody>
      </Container>
    )
  },
)

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

Table.displayName = 'YozoraTable'
export default Table

const Container = styled.table`
  display: block;
  max-width: 100%;
  width: ${getTableStyle('width')};
  overflow: ${getTableStyle('overflow')};
  margin: ${getTableStyle('margin')};
  border-spacing: ${getTableStyle('borderSpacing')};
  border-collapse: ${getTableStyle('borderCollapse')};
`

Container.defaultProps = {
  theme: { yozora: { table: defaultTableTheme } },
}

export const TableClasses = {
  container: `${Container}`,
}
