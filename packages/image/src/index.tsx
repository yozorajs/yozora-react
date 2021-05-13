import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image src.
   */
  src: string
  /**
   * Image alt.
   */
  alt?: string
  /**
   * Image title.
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
 * Render yozora `image`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 */
export function Image(props: ImageProps): React.ReactElement {
  const { className, style, src, alt = src, title, ...htmlProps } = props

  return (
    <img
      {...htmlProps}
      className={cn(className, 'yozora-image')}
      style={style}
      alt={alt}
      src={src}
      title={title}
    />
  )
}

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  title: PropTypes.string,
}

Image.displayName = 'YozoraImage'
export default Image
