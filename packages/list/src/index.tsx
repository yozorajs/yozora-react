import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import './styled-components'
import { defaultListTheme, getListStyle } from './theme'

export * from './theme'

/**
 * Props for creating List
 */
export interface ListProps
  extends React.OlHTMLAttributes<HTMLOListElement | HTMLUListElement> {
  /**
   * Flag used  to distinguish ordered and unordered list
   */
  ordered: boolean
  /**
   * Start number of ordered list
   */
  start?: number
  /**
   * List content
   */
  children: React.ReactNode
}

/**
 * Render `list` content
 *
 * @param props
 */
export const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(
  (props, forwardRef): React.ReactElement => {
    const { ordered, children, ...htmlProps } = props
    const as = ordered ? 'ol' : 'ul'

    return (
      <Container as={as} {...htmlProps} ref={forwardRef}>
        {children}
      </Container>
    )
  },
)

List.propTypes = {
  ordered: PropTypes.bool.isRequired,
  start: PropTypes.number,
  children: PropTypes.node.isRequired,
}

List.displayName = 'YozoraList'
export default List

const Container = styled.ul`
  color: ${getListStyle('color')};
  padding: ${getListStyle('padding')};
  margin: ${getListStyle('margin')};
  line-height: ${getListStyle('lineHeight')};
`

Container.defaultProps = {
  theme: { yozora: { list: defaultListTheme } },
}

export const ListClasses = {
  container: `${Container}`,
}
