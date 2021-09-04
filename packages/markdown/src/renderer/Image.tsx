import type { Image } from '@yozora/ast'
import ImageRenderer from '@yozora/react-image'
import React, { useContext, useEffect } from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraImage(image: Image): React.ReactElement {
  const { dispatch } = useContext(YozoraMarkdownContext)
  const {
    url: src,
    alt,
    title,
    srcSet,
    sizes,
    loading,
  } = image as Image & React.ImgHTMLAttributes<HTMLElement>

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

YozoraImage.displayName = 'YozoraImage'
export default YozoraImage
