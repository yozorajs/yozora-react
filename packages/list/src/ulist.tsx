import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for unordered list
 */
export interface UnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   *
   */
  children: React.ReactNode
}


const Container = styled.ul`
  padding: var(--md-list-padding, 0 0 0 1.2em);
  margin: var(--md-list-margin, 0 0 1em);
`

/**
 * Ordered list
 * @param props
 */
export const UnorderedList = React.forwardRef<HTMLUListElement, UnorderedListProps>(
  (props, forwardRef): React.ReactElement => {
    const { children, ...olProps } = props
    return (
      <Container { ...olProps } ref={ forwardRef }>
        { children }
      </Container>
    )
  }
)


UnorderedList.propTypes = {
  children: PropTypes.node.isRequired,
}


UnorderedList.displayName = 'UnorderedList'


export default UnorderedList
