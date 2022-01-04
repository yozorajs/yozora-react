import type { IImageReference } from '@yozora/ast'
import ImageRenderer from '@yozora/react-image'
import React, { useContext, useEffect } from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraImageReference: React.FC<IImageReference> = props => {
  const { dispatch, getDefinition } = useContext(YozoraMarkdownContext)
  const { alt, srcSet, sizes, loading } = props as IImageReference &
    React.ImgHTMLAttributes<HTMLElement>

  const definition = getDefinition(props.identifier)
  const src: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

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
YozoraImageReference.displayName = 'YozoraImageReference'
export default YozoraImageReference
