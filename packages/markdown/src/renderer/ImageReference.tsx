import type { ImageReference } from '@yozora/ast'
import ImageRenderer from '@yozora/react-image'
import React, { useContext, useEffect } from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraImageReference(
  imageReference: ImageReference,
): React.ReactElement {
  const { dispatch, getDefinition } = useContext(YozoraMarkdownContext)
  const { alt, srcSet, sizes, loading } = imageReference as ImageReference &
    React.ImgHTMLAttributes<HTMLElement>

  const definition = getDefinition(imageReference.identifier)
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

YozoraImageReference.displayName = 'YozoraImageReference'
export default YozoraImageReference
