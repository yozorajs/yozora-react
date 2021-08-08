import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link contents.
   */
  children?: React.ReactNode
  /**
   * Link url.
   */
  url: string
  /**
   * Link title.
   */
  title?: string
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
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export const Link: React.FC<LinkProps> = props => {
  const {
    children, // children is not allowed.
    className,
    url,
    rel = 'noopener,noreferrer',
    style,
    target = '_blank',
    title,
    ...htmlProps
  } = props

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      {...htmlProps}
      className={cn('yozora-link', className)}
      style={style}
      href={url}
      title={title}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  rel: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
}

Link.displayName = 'YozoraLink'
export default Link
