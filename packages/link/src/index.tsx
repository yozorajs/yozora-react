import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defaultLinkTheme, getLinkStyle } from './theme'
export * from './theme'


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
  color: ${ getLinkStyle('color') };
  font-size: ${ getLinkStyle('fontSize') };
  font-style: ${ getLinkStyle('fontStyle') };
  text-decoration: ${ getLinkStyle('textDecoration') };
`


Container.defaultProps = {
  theme: { yozora: { link: defaultLinkTheme } }
}


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


Link.displayName = 'link'


Link.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}


export default Link
