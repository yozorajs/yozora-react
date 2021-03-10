import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from './_base'
import { Container } from './_base'

/**
 * Render `link` content
 *
 * @param props
 */
export const RouteLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardRef): React.ReactElement => {
    const { url, href, title, ...htmlProps } = props

    return (
      <Container
        {...htmlProps}
        as={Link}
        ref={forwardRef}
        title={title}
        to={{ pathname: url }}
      />
    )
  },
)

RouteLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
}

RouteLink.displayName = 'YozoraRouteLink'
export default RouteLink
