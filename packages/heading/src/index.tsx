import PropTypes from 'prop-types'
import React from 'react'
import { HeadingLinkIcon } from './icon'

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Heading level
   */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * Heading content
   */
  children?: React.ReactNode
  /**
   * Heading identifier
   */
  identifier?: string
  /**
   * Root css class of the component.
   * @default 'yozora-heading'
   */
  className?: string
  /**
   * Heading link icon
   */
  linkIcon?: React.ReactNode
}

/**
 * Render `heading` content.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 */
export const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      className = 'yozora-heading',
      children,
      identifier,
      level,
      linkIcon = <HeadingLinkIcon />,
      ...htmlProps
    } = props

    const H: any = ('h' + props.level) as keyof JSX.IntrinsicElements
    return (
      <div {...htmlProps} ref={forwardRef} className={className}>
        <a id={identifier} href={'#' + identifier}>
          {linkIcon}
        </a>
        <H>{children}</H>
      </div>
    )
  },
)

Heading.propTypes = {
  level: PropTypes.oneOf<1 | 2 | 3 | 4 | 5 | 6>([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
  identifier: PropTypes.string,
  className: PropTypes.string,
  linkIcon: PropTypes.node,
}

Heading.displayName = 'YozoraHeading'
export default Heading
