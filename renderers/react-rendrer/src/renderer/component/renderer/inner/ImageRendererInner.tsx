import React from 'react'
import { clsx } from '../../../../util/clsx'
import type { INodeRendererAction } from '../../../context'
import { NodeRendererActionsType } from '../../../context'

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
      props.className !== nextProps.className ||
      props.dispatch !== nextProps.dispatch
    )
  }

  public override render(): React.ReactElement {
    const { src, alt, title, srcSet, sizes, loading, className } = this.props
    const { onImageClick } = this

    return (
      <figure className={clsx(className, cls)}>
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

  protected readonly onImageClick = (): void => {
    const { dispatch, src, alt } = this.props
    dispatch({
      type: NodeRendererActionsType.ACTIVE_IMAGE,
      payload: { src, alt },
    })
  }
}

const cls = 'yozora-image__root'
