import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface LightButtonsProps {
  /**
   * Called when the close button clicked.
   */
  onClose?(): void
  /**
   * Called when the minimize button clicked.
   */
  onMinimize?(): void
  /**
   * Called when the maximize button clicked.
   */
  onMaximize?(): void
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

/**
 * Light buttons, imitate the window action icons in MacOS.
 * @param props
 * @returns
 */
export const LightButtons: React.FC<LightButtonsProps> = props => {
  const { className, style, onClose, onMaximize, onMinimize } = props

  return (
    <span
      className={cn('yozora-common-light-buttons', className)}
      style={style}
    >
      <span
        key="close"
        className="yozora-common-light-button yozora-common-light-button--close"
        title="close"
        onClick={onClose}
      />
      <span
        key="minimize"
        className="yozora-common-light-button yozora-common-light-button--minimize"
        title="minimize"
        onClick={onMinimize}
      />
      <span
        key="maximize"
        className="yozora-common-light-button yozora-common-light-button--maximize"
        title="maximize"
        onClick={onMaximize}
      />
    </span>
  )
}

LightButtons.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onMaximize: PropTypes.func,
  onMinimize: PropTypes.func,
  style: PropTypes.object,
}

LightButtons.displayName = 'YozoraLightButtons'
export default LightButtons
