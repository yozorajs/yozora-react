import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


/**
 * Props for creating link
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link url
   */
  url: string
  /**
   * Link title
   */
  title?: string
  /**
   * link content
   */
  children: React.ReactNode
}


const Container = styled.a`
  color: var(--md-link-color);
  font-size: var(--md-link-font-size, inherit);
  font-style: var(--md-link-font-style, normal);
  text-decoration: var(--md-link-text-decoration, none);
`


/**
 * Render link content
 *
 * @param props
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      url,
      href,
      title,
      target = '_blank',
      rel = 'noreferrer',
      ...anchorProps
    } = props

    return (
      <Container
        { ...anchorProps }
        ref={ forwardRef }
        title={ title }
        href={ url }
        target={ target }
        rel={rel}
      />
    )
  }
)


Link.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}


Link.displayName = 'link'


export default Link
