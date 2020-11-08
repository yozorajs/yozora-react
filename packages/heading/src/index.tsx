import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeadingLinkIcon } from './icon'
import { calcIdentifierForHeading } from './util'
export * from './icon'
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
  margin: 0 -2em;
  padding: 0 2em;
  line-height: var(--md-heading-line-height, 1.25);
  font-family: var(--md-heading-font-family);
  h1, h2, h3, h4, h5, h6 {
    margin: var(--md-heading-margin, 1.2em 0 1em);
    line-height: var(--md-heading-line-height, 1.25);
    color: var(--md-heading-color, inherit);
    font-style: var(--md-heading-font-style, normal);
  }
  h1, h2 {
    padding: 0.3em 0;
    border-bottom: 1px solid var(--md-heading-border-color);
    margin: 0.9em 0 1em;
  }
  h1 {
    font-size: var(--md-heading1-font-size, 2em);
  }
  h2 {
    font-size: var(--md-heading2-font-size, 1.5em);
  }
  h3 {
    font-size: var(--md-heading3-font-size, 1.25em);
  }
  h4 {
    font-size: var(--md-heading4-font-size, 1em);
  }
  h5 {
    font-size: var(--md-heading5-font-size, 0.875em);
  }
  h6 {
    font-size: var(--md-heading6-font-size, 0.85em);
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
    visibility: visible;
    opacity: 1;
  }
`


/**
 * Render Heading content
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
