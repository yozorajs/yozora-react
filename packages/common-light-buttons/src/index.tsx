import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { LightButtonType, lightButtonColorMap } from './constant'

export * from './constant'

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
export function LightButtons(props: LightButtonsProps): React.ReactElement {
  const { className, style, onClose, onMaximize, onMinimize } = props

  return (
    <Container
      className={cn('yozora-common-light-buttons', className)}
      style={style}
    >
      <LightButton
        type={LightButtonType.CLOSE}
        title="close"
        onClick={onClose}
      />
      <LightButton
        type={LightButtonType.MINIMIZE}
        title="minimize"
        onClick={onMinimize}
      />
      <LightButton
        type={LightButtonType.MAXIMIZE}
        title="maximize"
        onClick={onMaximize}
      />
    </Container>
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

const LightButton = styled.span<{ type: LightButtonType }>`
  display: inline-block;
  box-sizing: border-box;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-left: 8px;
  background-color: ${props =>
    lightButtonColorMap[props.type] ?? 'transparent'};
`

const Container = styled.span`
  user-select: none;
`
