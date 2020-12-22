import styled from 'styled-components'
import { defaultLinkTheme, getLinkStyle } from './theme'


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


export const Container = styled.a`
  color: ${ getLinkStyle('color') };
  font-size: ${ getLinkStyle('fontSize') };
  font-style: ${ getLinkStyle('fontStyle') };
  text-decoration: ${ getLinkStyle('textDecoration') };
`


Container.defaultProps = {
  theme: { yozora: { link: defaultLinkTheme } }
}
