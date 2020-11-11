import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeadingLinkIcon } from './icon'
import './styled-components'
import { defaultHeadingTheme, getHeadingStyle } from './theme'
import { calcIdentifierForHeading } from './util'
export * from './icon'
export * from './theme'
export * from './util'


/**
 * Props for creating Heading
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Heading level
   */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * Heading content
   */
  children: React.ReactNode
  /**
   * Heading identifier
   */
  identifier?: string
  /**
   * Heading link icon
   */
  linkIcon?: React.ReactNode
  /**
   * Css class name of link element
   */
  linkClassName?: string
  /**
   * Calc identifier
   */
  calcIdentifier?: (h: HTMLHeadingElement) => string
}


const Container = styled.header`
  position: relative;
  display: block;
  margin: ${ getHeadingStyle('margin') };
  padding: ${ getHeadingStyle('padding') };
  line-height: ${ getHeadingStyle('lineHeight') };
  font-family: ${ getHeadingStyle('fontFamily') };
  h1, h2, h3, h4, h5, h6 {
    color: ${ getHeadingStyle('color') };
    font-style: ${ getHeadingStyle('fontStyle') };
  }
  h1, h2 {
    padding: 0.3em 0;
    border-bottom: 1px solid ${ getHeadingStyle('borderColor') };
    margin: 0.9em 0 1em;
  }
  h1 {
    font-size: ${ getHeadingStyle('h1FontSize') };
  }
  h2 {
    font-size: ${ getHeadingStyle('h2FontSize') };
  }
  h3 {
    font-size: ${ getHeadingStyle('h3FontSize') };
  }
  h4 {
    font-size: ${ getHeadingStyle('h4FontSize') };
  }
  h5 {
    font-size: ${ getHeadingStyle('h5FontSize') };
  }
  h6 {
    font-size: ${ getHeadingStyle('h6FontSize') };
  }
  & > a {
    position: absolute;
    top: 50%;
    left: 0.25em;
    transform: translate(0, -50%);
    display: inline-block;
    height: 1.25em;
    padding-right: 0.25em;
    font-size: 1.25em;
    line-height: 1;
    color: ${ getHeadingStyle('linkColor') };
    user-select: none;
    text-decoration: none;
    visibility: hidden;
    opacity: 0;
  }
  & > a > svg {
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
  &:hover > a {
    color: ${ getHeadingStyle('hoverLinkColor') };
    visibility: visible;
    opacity: 1;
  }
`


Container.defaultProps = {
  theme: { yozora: { heading: defaultHeadingTheme } }
}


/**
 * Render `heading` content
 *
 * @param props
 */
export const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      level,
      children,
      identifier: _identifier,
      linkIcon = <HeadingLinkIcon />,
      linkClassName,
      calcIdentifier = calcIdentifierForHeading,
      ...headerProps
    } = props

    const H: any = 'h' + props.level as keyof JSX.IntrinsicElements
    const hRef = useRef<HTMLHeadingElement | null>(null)

    const [identifier, setIdentifier] = useState<string | undefined>(_identifier)
    useEffect(() => {
      if (_identifier != null) {
        setIdentifier(_identifier)
        return
      }

      if (hRef.current != null) {
        const nextIdentifier = calcIdentifier(hRef.current)
        setIdentifier(nextIdentifier)
        return
      }
    }, [hRef, calcIdentifier, _identifier])

    return (
      <Container { ...headerProps } ref={ forwardRef } >
        <a
          id={ identifier }
          className={ linkClassName }
          href={ '#' + identifier }
        >
          { linkIcon }
        </a>
        <H ref={ hRef }>{ children }</H>
      </Container >
    )
  }
)


Heading.propTypes = {
  level: PropTypes.oneOf<1 | 2 | 3 | 4 | 5 | 6>([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node.isRequired,
  identifier: PropTypes.string,
  linkIcon: PropTypes.node,
  linkClassName: PropTypes.string,
  calcIdentifier: PropTypes.func,
}


Heading.displayName = 'Heading'


export default Heading
