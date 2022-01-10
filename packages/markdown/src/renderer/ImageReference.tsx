import type { IImageReference } from '@yozora/ast'
import ImageReference from '@yozora/react-image'
import React from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContextType } from '../context/context'

export const YozoraImageReferenceRenderer: React.FC<
  IImageReference
> = props => {
  const { dispatch, getDefinition } = React.useContext(
    YozoraMarkdownContextType,
  )
  const { alt, srcSet, sizes, loading } = props as IImageReference &
    React.ImgHTMLAttributes<HTMLElement>

  const definition = getDefinition(props.identifier)
  const src: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

  React.useEffect(() => {
    dispatch({
      type: YozoraMarkdownActionsType.IMAGE_VIEWER_ADD_ITEM,
      payload: { src, alt },
    })
  }, [dispatch, src, alt])

  return (
    <ImageReference
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

YozoraImageReferenceRenderer.displayName = 'YozoraImageReferenceRenderer'
