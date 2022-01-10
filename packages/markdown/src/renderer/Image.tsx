import type { IImage } from '@yozora/ast'
import Image from '@yozora/react-image'
import React from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContextType } from '../context/context'

export const YozoraImageRenderer: React.FC<IImage> = props => {
  const { dispatch } = React.useContext(YozoraMarkdownContextType)
  const {
    url: src,
    alt,
    title,
    srcSet,
    sizes,
    loading,
  } = props as IImage & React.ImgHTMLAttributes<HTMLElement>

  React.useEffect(() => {
    dispatch({
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_ADD_ITEM,
      payload: { src, alt },
    })
  }, [dispatch, src, alt])

  return (
    <Image
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

YozoraImageRenderer.displayName = 'YozoraImageRenderer'
