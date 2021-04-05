import PropTypes from 'prop-types'
import React from 'react'
import type { LinkProps } from './_base'
import { Container } from './_base'

/**
 * Render `link` content
 *
 * @param props
 */
export const ExternalLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      url,
      href,
      title,
      target = '_blank',
      rel = 'noreferrer',
      ...htmlProps
    } = props

    return (
      <Container
        {...htmlProps}
        ref={forwardRef}
        title={title}
        href={url}
        target={target}
        rel={rel}
      />
    )
  },
)

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
}

ExternalLink.displayName = 'YozoraExternalLink'
export default ExternalLink
