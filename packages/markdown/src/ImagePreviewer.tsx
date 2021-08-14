import PropTypes from 'prop-types'
import React, { useCallback, useContext } from 'react'
import { YozoraMarkdownContext } from './Context'
import type { ImageViewerProps } from './types'

export interface YozoraImagePreviewerProps {
  /**
   * Image previewer
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
  ImageViewer?:
    | React.FC<ImageViewerProps>
    | React.ComponentClass<ImageViewerProps>
}

/**
 * Image previewer.
 * @param param0
 * @returns
 */
export const YozoraImagePreviewer: React.FC<YozoraImagePreviewerProps> = ({
  ImageViewer,
}) => {
  const { images, imageViewerVisible, activatedImageIndex, dispatch } =
    useContext(YozoraMarkdownContext)

  const handleCloseImageViewer = useCallback<() => void>(
    () => dispatch({ imageViewerVisible: false }),
    [dispatch],
  )

  if (ImageViewer === undefined) return null
  return (
    <ImageViewer
      visible={imageViewerVisible}
      images={images}
      activeIndex={activatedImageIndex < 0 ? undefined : activatedImageIndex}
      onClose={handleCloseImageViewer}
      onMaskClick={handleCloseImageViewer}
    />
  )
}

YozoraImagePreviewer.propTypes = {
  ImageViewer: PropTypes.any,
}

YozoraImagePreviewer.displayName = 'YozoraImagePreviewer'
export default YozoraImagePreviewer
