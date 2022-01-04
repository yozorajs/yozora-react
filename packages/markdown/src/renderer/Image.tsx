import type { IImage } from '@yozora/ast'
import ImageRenderer from '@yozora/react-image'
import React, { useContext, useEffect } from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraImage: React.FC<IImage> = props => {
  const { dispatch } = useContext(YozoraMarkdownContext)
  const {
    url: src,
    alt,
    title,
    srcSet,
    sizes,
    loading,
  } = props as IImage & React.ImgHTMLAttributes<HTMLElement>

  useEffect(() => {
    dispatch({
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_ADD_ITEM,
      payload: { src, alt },
    })
  }, [dispatch, src, alt])

  return (
    <ImageRenderer
      src={src}
      alt={alt}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      onClick={() =>
        dispatch({
          type: YozoraMarkdownActionsType.IMAGE_VIEWER_ACTIVE_ITEM,
          payload: { src, alt },
        })
      }
    />
  )
}

ImageRenderer.displayName = 'ImageRenderer'
YozoraImage.displayName = 'YozoraImage'
export default YozoraImage
