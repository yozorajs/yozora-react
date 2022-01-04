import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
export const Image: React.FC<IImageProps> = props => {
  const { className, style, src, alt = src, title, ...htmlProps } = props

  return (
    <figure className={cn(className, 'yozora-image')}>
      <img {...htmlProps} style={style} alt={alt} src={src} title={title} />
      {title && <figcaption>{title}</figcaption>}
    </figure>
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
