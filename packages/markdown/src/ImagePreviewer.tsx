import PropTypes from 'prop-types'
import React from 'react'
import { YozoraMarkdownActionsType } from './context/actions'
import { YozoraMarkdownContextType } from './context/context'
import type { IImageViewerProps } from './types'

export interface IYozoraImageViewerProps {
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
export const YozoraImageViewer: React.FC<IYozoraImageViewerProps> = ({ ImageViewer }) => {
  const { images, imageViewerVisible, imageActivatedIndex, dispatch } =
    React.useContext(YozoraMarkdownContextType)

  const handleCloseImageViewer = React.useCallback<() => void>(
    () =>
      dispatch({
        type: YozoraMarkdownActionsType.IMAGE_VIEWER_TOGGLE,
        payload: false,
      }),
    [dispatch],
  )

  if (!ImageViewer) return null

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

YozoraImageViewer.propTypes = {
  ImageViewer: PropTypes.any,
}

YozoraImageViewer.displayName = 'YozoraImageViewer'
