import PropTypes from 'prop-types'
import React from 'react'
import { NodeRendererActionsType } from '../context/action'
import { useNodeRendererContext } from '../context/context'
import type { IPreviewImageItem } from '../types'

/**
 * Props of ImageViewer
 * @see https://github.com/infeng/react-viewer#props
 */
export interface IImageViewerProps {
  /**
   * Whether if the image viewer is visible.
   */
  visible: boolean
  /**
   * Image items.
   */
  images: IPreviewImageItem[]
  /**
   * Current activated index of image.
   */
  activeIndex?: number
  /**
   * Callback functions when close the image viewer.
   */
  onClose(): void
  /**
   * callback function when mask is clicked
   */
  onMaskClick(): void
}

export interface IImagePreviewerProps {
  /**
   * Image viewer
   *
   *  Browser only:
   *
   *      import Viewer from 'react-viewer'
   *
   *  SSR:
   *
   *      import loadable from '@loadable/component'
   *      const Viewer = loadable(() => import('react-viewer'))
   *
   * @see https://github.com/infeng/react-viewer
   * @see https://github.com/gregberge/loadable-components
   */
  ImageViewer?: React.FC<IImageViewerProps> | React.ComponentClass<IImageViewerProps>
}

/**
 * Image previewer.
 * @param param0
 * @returns
 */
export const ImagePreviewer: React.FC<IImagePreviewerProps> = ({ ImageViewer }) => {
  const { imageActivatedIndex, imageViewerVisible, images, dispatch } = useNodeRendererContext()
  const handleCloseImageViewer = React.useCallback<() => void>(
    () =>
      dispatch({
        type: NodeRendererActionsType.IMAGE_VIEWER_TOGGLE,
        payload: false,
      }),
    [dispatch],
  )

  if (!ImageViewer) return null

  const activatedIndex = imageActivatedIndex < 0 ? undefined : imageActivatedIndex
  return (
    <ImageViewer
      visible={imageViewerVisible}
      images={images}
      activeIndex={activatedIndex}
      onClose={handleCloseImageViewer}
      onMaskClick={handleCloseImageViewer}
    />
  )
}

ImagePreviewer.propTypes = {
  ImageViewer: PropTypes.any,
}
