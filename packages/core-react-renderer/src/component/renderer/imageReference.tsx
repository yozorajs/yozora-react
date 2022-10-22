/* eslint-disable react/prop-types */
import type { ImageReference } from '@yozora/ast'
import React from 'react'
import { NodeRendererActionsType } from '../../context/action'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `imageReference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#imageReference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image-reference
 */
export const ImageReferenceRenderer: INodeRenderer<ImageReference> = props => {
  const { definitionMap, dispatch } = useNodeRendererContext()
  const { alt, srcSet, sizes, loading } = props as ImageReference &
    React.ImgHTMLAttributes<HTMLElement>

  const definition = definitionMap[props.identifier]
  const src: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

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
    <ImageReferenceRendererInner
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

class ImageReferenceRendererInner extends React.PureComponent<{
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
      <figure className="yozora-image-reference yozora-image">
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
