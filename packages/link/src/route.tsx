import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinkProps, Container } from './anchor'


/**
 * Render `link` content
 *
 * @param props
 */
export const RouteLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      url,
      href,
      title,
      ...anchorProps
    } = props

    return (
      <Container
        { ...anchorProps }
        as={ Link }
        ref={ forwardRef }
        title={ title }
        to={ { pathname: url } }
      />
    )
  }
)


RouteLink.displayName = 'RouteLink'


RouteLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}


export default Link
