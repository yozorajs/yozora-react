import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { copyToClipboard } from './util'

export type CopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

/**
 * Map of copy status and color.
 */
export const defaultStatusColorMap: Record<
  CopyStatus,
  React.CSSProperties['color']
> = {
  waiting: 'hsl(0deg, 0%, 80%)',
  copying: 'hsl(0deg, 0%, 80%)',
  failed: 'hsl(0deg, 80%, 40%) !important',
  succeed: 'hsl(120deg, 80%, 40%) !important',
}

/**
 * Map of copy status and displaying text.
 */
export const defaultStatusTextMap: Record<CopyStatus, string> = {
  waiting: 'copy',
  copying: 'copying..',
  failed: 'failed!',
  succeed: 'copied!',
}

export interface CopyButtonProps {
  /**
   * The literal texture content that waiting to copy.
   */
  value: string
  /**
   * Map of copy status and color.
   * @default defaultStatusColorMap
   */
  statusColorMap?: Record<CopyStatus, React.CSSProperties['color']>
  /**
   * Map of copy status and displaying text.
   * @default defaultStatusTextMap
   */
  statusTextMap?: Record<CopyStatus, string>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

export function CopyButton(props: CopyButtonProps): React.ReactElement {
  const {
    value,
    statusColorMap = defaultStatusColorMap,
    statusTextMap = defaultStatusTextMap,
    className,
    style,
  } = props

  const [status, setStatus] = useState<CopyStatus>('waiting')

  const handleCopy = (): void => {
    setStatus('copying')
    copyToClipboard(value)
      .then((succeed: boolean) => {
        if (succeed) {
          setStatus('succeed')
        } else {
          setStatus('failed')
        }
      })
      .catch(e => {
        console.error(e)
        setStatus('failed')
      })
      .finally(() => {
        setTimeout(() => setStatus('waiting'), 1000)
      })
  }

  const color = statusColorMap[status] ?? 'transparent'
  const text = statusTextMap[status] ?? ''
  return (
    <Container
      type="button"
      aria-label="Copy to clipboard"
      disabled={status !== 'waiting'}
      color={color}
      className={cn('yozora-common-copy-button', className)}
      style={style}
      onClick={handleCopy}
    >
      {text}
    </Container>
  )
}

CopyButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  statusColorMap: PropTypes.object,
  statusTextMap: PropTypes.object,
}

CopyButton.displayName = 'YozoraCopyButton'
export default CopyButton

const Container = styled.button`
  display: inline-block;
  padding: 0.4rem;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: ${props => props.color};
  &:hover{
    color: hsl(0deg, 0%, 100%);
  }
  &:active {
    color: hsl(0deg, 0%, 90%);
  }
`
