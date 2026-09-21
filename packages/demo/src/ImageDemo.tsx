import type { IImageViewerProps } from '@yozora/react-renderer'
import { ImageRenderer, ImageViewer, TokenNames, useThemeContext } from '@yozora/react-renderer'
import React from 'react'

export const previewImages = [{ src: './yozora.svg', alt: 'Yozora logo' }]

export function DemoImageViewer(props: IImageViewerProps): React.ReactElement {
  const { schema } = useThemeContext()
  const colors = schema?.colors
  return (
    <ImageViewer
      {...props}
      dark={schema?.darken}
      palette={
        colors
          ? {
              surface: colors[TokenNames.colorBgCode],
              text: colors[TokenNames.colorBody],
              border: colors[TokenNames.colorBorderCode],
            }
          : undefined
      }
    />
  )
}

export function ImageDemo(): React.ReactElement {
  return (
    <div className="demo-image-sample">
      <ImageRenderer type="image" url={previewImages[0].src} alt={previewImages[0].alt} />
    </div>
  )
}
