import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { copyToClipboard } from './util'
import './style.styl'

export type CopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

/**
 * Map of copy status and displaying text.
 */
export const defaultStatusNodeMap: Record<CopyStatus, React.ReactNode> = {
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
   * Map of copy status and displaying text.
   * @default defaultStatusTextMap
   */
  statusNodeMap?: Record<CopyStatus, React.ReactNode>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

export const CopyButton: React.FC<CopyButtonProps> = props => {
  const {
    value,
    statusNodeMap = defaultStatusNodeMap,
    className,
    style,
  } = props

  const [status, setStatus] = useState<CopyStatus>('waiting')

  const handleCopy = useCallback(() => {
    setStatus('copying')
    copyToClipboard(value)
      .then((succeed: boolean) => setStatus(succeed ? 'succeed' : 'failed'))
      .catch(e => {
        console.error(e)
        setStatus('failed')
      })
      .finally(() => {
        setTimeout(() => setStatus('waiting'), 1000)
      })
  }, [value])

  const text = statusNodeMap[status] ?? defaultStatusNodeMap[status]
  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      disabled={status !== 'waiting'}
      className={cn(
        'yozora-common-copy-button',
        {
          'yozora-common-copy-button--waiting': status === 'waiting',
          'yozora-common-copy-button--copying': status === 'copying',
          'yozora-common-copy-button--failed': status === 'failed',
          'yozora-common-copy-button--succeed': status === 'succeed',
        },
        className,
      )}
      style={style}
      onClick={handleCopy}
    >
      {text}
    </button>
  )
}

CopyButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  statusNodeMap: PropTypes.any,
}

CopyButton.displayName = 'YozoraCopyButton'
export default CopyButton
