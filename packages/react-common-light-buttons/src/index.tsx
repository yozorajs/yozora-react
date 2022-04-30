import { css, cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'

export interface ILightButtonsProps {
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
export const LightButtons: React.FC<ILightButtonsProps> = props => {
  const { className, style, onClose, onMaximize, onMinimize } = props
  return (
    <span className={cx(classes.container, className)} style={style}>
      <span
        key="close"
        className={cx(classes.lightBtn, classes.lightBtnClose)}
        title="close"
        onClick={onClose}
      />
      <span
        key="minimize"
        className={cx(classes.lightBtn, classes.lightBtnMinimize)}
        title="minimize"
        onClick={onMinimize}
      />
      <span
        key="maximize"
        className={cx(classes.lightBtn, classes.lightBtnMaximize)}
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

const classes = {
  container: css({
    userSelect: 'none',
  }),
  lightBtn: css({
    display: 'inline-block',
    boxSizing: 'border-box',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    marginLeft: '8px',
  }),
  lightBtnClose: css({
    backgroundColor: '#ed6c60',
  }),
  lightBtnMinimize: css({
    backgroundColor: '#f7c151',
  }),
  lightBtnMaximize: css({
    backgroundColor: '#64c856',
  }),
}
