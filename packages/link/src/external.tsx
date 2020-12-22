import React from 'react'
import PropTypes from 'prop-types'
import { Container, LinkProps } from './_base'


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
        { ...htmlProps }
        ref={ forwardRef }
        title={ title }
        href={ url }
        target={ target }
        rel={ rel }
      />
    )
  }
)


ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}


ExternalLink.displayName = 'YozoraExternalLink'
export default ExternalLink
