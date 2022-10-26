import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import { copyToClipboard } from './util'

export type ICopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'
export type ICopyStatusNodeMap = Record<ICopyStatus, React.ReactNode>

/**
 * Map of copy status and displaying text.
 */
export const defaultStatusNodeMap: ICopyStatusNodeMap = {
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
   * @default defaultStatusNodeMap
   */
  statusNodeMap?: ICopyStatusNodeMap
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
  const { value, statusNodeMap = defaultStatusNodeMap, className, style } = props

  const [status, setStatus] = React.useState<ICopyStatus>('waiting')

  const handleCopy = React.useCallback(() => {
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
      data-copy-status={status}
      className={cx(classes.container, className)}
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
