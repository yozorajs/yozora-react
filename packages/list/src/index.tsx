import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styled-components'
import { defaultListTheme, getListStyle } from './theme'
export * from './theme'


/**
 * Props for creating List
 */
export interface ListProps extends React.OlHTMLAttributes<HTMLOListElement | HTMLUListElement> {
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


const Container = styled.ul`
  color: ${ getListStyle('color') };
  padding: ${ getListStyle('padding') };
  margin: ${ getListStyle('margin') };
  line-height: ${ getListStyle('lineHeight') };
`


Container.defaultProps = {
  theme: { yozora: { list: defaultListTheme } }
}


/**
 * Render `list` content
 *
 * @param props
 */
export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (props, forwardRef): React.ReactElement => {
    const { ordered, children, ...listProps } = props
    const as = ordered ? 'ol' : 'ul'

    return (
      <Container as={ as } { ...listProps } ref={ forwardRef }>
        { children }
      </Container>
    )
  }
)


List.displayName = 'List'


List.propTypes = {
  ordered: PropTypes.bool.isRequired,
  start: PropTypes.number,
  children: PropTypes.node.isRequired,
}


export default List
