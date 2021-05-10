import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface HeadingProps {
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
   * Heading link icon
   */
  linkIcon?: React.ReactNode
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

/**
 * Render `heading` content.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 */
export function Heading(props: HeadingProps): React.ReactElement {
  const {
    className,
    style,
    children,
    identifier,
    level,
    linkIcon = '¶',
  } = props

  const id = identifier == null ? undefined : encodeURIComponent(identifier)
  const H: any = ('h' + level) as keyof JSX.IntrinsicElements
  return (
    <H
      id={id}
      className={cn(
        'yozora-heading',
        { 'yozora-heading--toc': identifier != null },
        className,
      )}
      style={style}
    >
      <p className="yozora-heading__content">{children}</p>
      {identifier && (
        <a className="yozora-heading__anchor" href={'#' + id}>
          {linkIcon}
        </a>
      )}
    </H>
  )
}

Heading.propTypes = {
  anchorClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  identifier: PropTypes.string,
  level: PropTypes.oneOf<1 | 2 | 3 | 4 | 5 | 6>([1, 2, 3, 4, 5, 6]).isRequired,
  linkIcon: PropTypes.node,
  style: PropTypes.object,
}

Heading.displayName = 'YozoraHeading'
export default Heading
