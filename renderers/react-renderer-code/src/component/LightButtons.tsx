import { clsx } from '@yozora/react-renderer'
import React from 'react'

interface IProps {
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
 */
export class LightButtons extends React.Component<IProps> {
  public static readonly displayName = 'LightButtons'

  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props = this.props
    return props.className !== nextProps.className || props.style !== nextProps.style
  }

  public override render(): React.ReactElement {
    const { onClose, onMaximize, onMinimize } = this
    const { className, style } = this.props

    return (
      <span className={clsx(classes.container, className)} style={style}>
        <span
          key="close"
          className={clsx(classes.lightBtn, classes.lightBtnClose)}
          title="close"
          onClick={onClose}
        />
        <span
          key="minimize"
          className={clsx(classes.lightBtn, classes.lightBtnMinimize)}
          title="minimize"
          onClick={onMinimize}
        />
        <span
          key="maximize"
          className={clsx(classes.lightBtn, classes.lightBtnMaximize)}
          title="maximize"
          onClick={onMaximize}
        />
      </span>
    )
  }

  protected readonly onClose = (): void => {
    this.props.onClose?.()
  }

  protected readonly onMinimize = (): void => {
    this.props.onMinimize?.()
  }

  protected readonly onMaximize = (): void => {
    this.props.onMaximize?.()
  }
}

const classes = {
  container: 'yz:select-none',
  lightBtn: 'yz:inline-block yz:box-border yz:size-[12px] yz:rounded-full yz:ml-[8px]',
  lightBtnClose: 'yz:bg-[#ed6c60]',
  lightBtnMinimize: 'yz:bg-[#f7c151]',
  lightBtnMaximize: 'yz:bg-[#64c856]',
}
