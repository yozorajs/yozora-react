/* eslint-disable react/prop-types */
import type { Image } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'
import { ImageRendererInner } from './inner/ImageRendererInner'

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

  return (
    <ImageRendererInner
      alt={alt}
      src={src}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      className="yozora-image"
      dispatch={dispatch}
    />
  )
}
