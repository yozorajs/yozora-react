import type { Image } from '@yozora/ast'
import React from 'react'
import { NodeRendererActionsType } from '../../context/action'
import { useNodeRendererContext } from '../../context/context'

/**
 * Render yozora `image`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 */
export const ImageRenderer: React.FC<Image> = props => {
  const { dispatch } = useNodeRendererContext()
  const {
    url: src,
    alt,
    title,
    srcSet,
    sizes,
    loading,
  } = props as Image & React.ImgHTMLAttributes<HTMLElement>

  React.useEffect(() => {
    dispatch({
      type: NodeRendererActionsType.IMAGE_VIEWER_ADD_ITEM,
      payload: { src, alt },
    })
  }, [dispatch, src, alt])

  const onImageClick = React.useCallback(() => {
    dispatch({
      type: NodeRendererActionsType.IMAGE_VIEWER_ACTIVE_ITEM,
      payload: { src, alt },
    })
  }, [dispatch, src, alt])

  return (
    <figure className="yozora-image">
      <img
        alt={alt}
        src={src}
        title={title}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        onClick={onImageClick}
      />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  )
}
