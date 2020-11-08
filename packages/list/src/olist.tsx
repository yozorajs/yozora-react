import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for ordered list
 */
export interface OrderedListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /**
   * Start number
   */
  start: number
  /**
   * Ordered list content
   */
  children: React.ReactNode
}


const Container = styled.ol`
  padding: var(--md-list-padding, 0 0 0 1.2em);
  margin: var(--md-list-margin, 0 0 1em);
`


/**
 * Ordered list
 * @param props
 */
export const OrderedList = React.forwardRef<HTMLOListElement, OrderedListProps>(
  (props, forwardRef): React.ReactElement => {
    const { start, children, ...olProps } = props
    return (
      <Container { ...olProps } start={ start } ref={ forwardRef }>
        { children }
      </Container>
    )
  }
)


OrderedList.propTypes = {
  start: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}


OrderedList.displayName = 'OrderedList'


export default OrderedList
