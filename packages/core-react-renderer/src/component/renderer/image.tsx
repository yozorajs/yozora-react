/* eslint-disable react/prop-types */
import { css, cx } from '@emotion/css'
import type { Image } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import type { INodeRendererAction } from '../../context/action'
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

  return (
    <ImageRendererInner
      alt={alt}
      src={src}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      dispatch={dispatch}
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
  dispatch: React.Dispatch<INodeRendererAction>
}> {
  public override render(): React.ReactElement {
    const { src, alt, title, srcSet, sizes, loading } = this.props
    const { onImageClick } = this

    return (
      <figure className={cls}>
        <img
          alt={alt}
          src={src}
          title={title}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          onClick={onImageClick}
        />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    )
  }

  public override componentDidMount(): void {
    const { dispatch, src, alt } = this.props
    dispatch({
      type: NodeRendererActionsType.IMAGE_VIEWER_ADD_ITEM,
      payload: { src, alt },
    })
  }

  protected readonly onImageClick = (): void => {
    const { dispatch, src, alt } = this.props
    dispatch({
      type: NodeRendererActionsType.IMAGE_VIEWER_ACTIVE_ITEM,
      payload: { src, alt },
    })
  }
}

const cls = cx(
  'yozora-image',
  css({
    boxSizing: 'border-box',
    maxWidth: '100%', // Prevent images from overflowing the container.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    '> img': {
      flex: '1 0 auto',
      boxSizing: 'border-box',
      maxWidth: '100%',
      border: `1px solid ${tokens.colorBorderImage}`,
      boxShadow: '0 0 20px 1px rgba(126, 125, 150, 0.6)',
    },
    '> figcaption': {
      textAlign: 'center',
      fontStyle: 'italic',
      fontSize: '1em',
      color: tokens.colorImageTitle,
    },
  }),
)
