/* eslint-disable react/prop-types */
import type { Image } from '@yozora/ast'
import React from 'react'
import { NodeRendererActionsType } from '../../context/action'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `image`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 */
export const ImageRenderer: INodeRenderer<Image> = props => {
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
    <ImageRendererInner
      alt={alt}
      src={src}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      onClick={onImageClick}
    />
  )
}

class ImageRendererInner extends React.PureComponent<{
  src: string
  alt: string
  title: string | undefined
  srcSet: string | undefined
  sizes: string | undefined
  loading: 'eager' | 'lazy' | undefined
  onClick: React.MouseEventHandler<HTMLImageElement>
}> {
  public override render(): React.ReactElement {
    const { src, alt, title, srcSet, sizes, loading, onClick } = this.props
    return (
      <figure className="yozora-image">
        <img
          alt={alt}
          src={src}
          title={title}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          onClick={onClick}
        />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    )
  }
}
