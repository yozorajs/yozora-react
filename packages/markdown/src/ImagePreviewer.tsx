import PropTypes from 'prop-types'
import React, { useCallback, useContext } from 'react'
import { YozoraMarkdownActionsType } from './context/actions'
import { YozoraMarkdownContext } from './context/context'
import type { IImageViewerProps } from './types'

export interface IYozoraImagePreviewerProps {
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
    | React.FC<IImageViewerProps>
    | React.ComponentClass<IImageViewerProps>
}

/**
 * Image previewer.
 * @param param0
 * @returns
 */
export const YozoraImagePreviewer: React.FC<IYozoraImagePreviewerProps> = ({
  ImageViewer,
}) => {
  const { images, imageViewerVisible, imageActivatedIndex, dispatch } =
    useContext(YozoraMarkdownContext)

  const handleCloseImageViewer = useCallback<() => void>(
    () =>
      dispatch({
        type: YozoraMarkdownActionsType.IMAGE_VIEWER_TOGGLE,
        payload: false,
      }),
    [dispatch],
  )

  if (ImageViewer === undefined) return null
  return (
    <ImageViewer
      visible={imageViewerVisible}
      images={images}
      activeIndex={imageActivatedIndex < 0 ? undefined : imageActivatedIndex}
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
