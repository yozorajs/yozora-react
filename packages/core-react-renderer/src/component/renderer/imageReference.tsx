/* eslint-disable react/prop-types */
import type { ImageReference } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'
import { ImageRendererInner } from './inner/ImageRendererInner'

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

  return (
    <ImageRendererInner
      alt={alt}
      src={src}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      className="yozora-image-reference"
      dispatch={dispatch}
    />
  )
}
