import React from 'react'
import type { IImageViewerProps } from '../renderer/component/ImagePreviewer'
import { MediaPreview } from './MediaPreview'
import type { IPreviewPalette } from './types'

/** Extend the existing viewer slot with optional preview appearance. */
interface IProps extends Omit<IImageViewerProps, 'onMaskClick'> {
  dark?: boolean
  palette?: IPreviewPalette
  onMaskClick?(): void
}

export function ImageViewer({
  visible,
  images,
  activeIndex = 0,
  ...props
}: IProps): React.ReactElement | null {
  const image = images[activeIndex]
  if (!visible || !image) return null
  return (
    <MediaPreview
      key={image.src}
      {...props}
      source={{ kind: 'image', src: image.src, alt: image.alt }}
    />
  )
}
