/* eslint-disable react/prop-types */
import { css } from '@emotion/css'
import { tokens } from '@yozora/core-react-constant'
import React from 'react'
import type { INodeRendererAction } from '../../../context/action'
import { NodeRendererActionsType } from '../../../context/action'

interface IProps {
  src: string
  alt: string
  title: string | undefined
  srcSet: string | undefined
  sizes: string | undefined
  loading: 'eager' | 'lazy' | undefined
  className: string
  dispatch: React.Dispatch<INodeRendererAction>
}

export class ImageRendererInner extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: IProps): boolean {
    const props = this.props
    return (
      props.src !== nextProps.src ||
      props.alt !== nextProps.alt ||
      props.title !== nextProps.title ||
      props.srcSet !== nextProps.srcSet ||
      props.sizes !== nextProps.sizes ||
      props.loading !== nextProps.loading ||
      props.className !== nextProps.className
    )
  }

  public override render(): React.ReactElement {
    const { src, alt, title, srcSet, sizes, loading, className } = this.props
    const { onImageClick } = this

    return (
      <figure className={`${className} ${cls}`}>
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

const cls = css({
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
})
