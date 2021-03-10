import PropTypes from 'prop-types'
import React from 'react'
import type { LinkProps } from './_base'
import { Container } from './_base'
import ExternalLink from './external'
import RouteLink from './route'
import './styled-components'

export { ExternalLink } from './external'
export { RouteLink } from './route'
export * from './theme'

/**
 * Test if the given url is an external link
 *
 * @param url
 * @see https://github.com/mrded/is-url-external/blob/f46b37811034048b0803966af7832f3c7822da5a/index.js
 */
export function isExternalUrl(url: string): boolean {
  const host = window.location.hostname

  // Absolute URL.
  if (/^https?:\/\//.test(url)) {
    // The easy way to parse an URL, is to create <a> element.
    // @see: https://gist.github.com/jlong/2428561
    const anchor = document.createElement('a')
    anchor.href = url
    return host !== anchor.hostname
  }

  return false
}

/**
 * Render Link depend on whether if it's a external link
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardRef): React.ReactElement => {
    const isExternal = isExternalUrl(props.url)
    return isExternal ? (
      <ExternalLink {...props} ref={forwardRef} />
    ) : (
      <RouteLink {...props} ref={forwardRef} />
    )
  },
)

Link.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
}

Link.displayName = 'YozoraLink'
export default Link

export const LinkClasses = {
  container: `${Container}`,
}
