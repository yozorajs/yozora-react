import type { ImageReference } from '@yozora/ast'
import React from 'react'
import { YozoraMarkdownActionsType } from '../context/actions'
import { YozoraMarkdownContextType } from '../context/context'

/**
 * Render yozora `imageReference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#imageReference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image-reference
 */
export const ImageReferenceRenderer: React.FC<ImageReference> = props => {
  const { dispatch, getDefinition } = React.useContext(YozoraMarkdownContextType)
  const { alt, srcSet, sizes, loading } = props as ImageReference &
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
    <figure className="yozora-image-reference yozora-image">
      <img alt={alt} src={src} title={title} srcSet={srcSet} sizes={sizes} loading={loading} />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  )
}
