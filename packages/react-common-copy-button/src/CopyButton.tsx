import { cx } from '@emotion/css'
import { useEventCallback } from '@guanghechen/react-hooks'
import PropTypes from 'prop-types'
import React from 'react'
import { CopyStatus } from './constant'
import { classes } from './style'
import { copyToClipboard } from './util'

export type ICopyStatusTipMap = Record<CopyStatus, React.ReactNode>

/**
 * Map of copy status and displaying text.
 */
const defaultStatusTipMap: ICopyStatusTipMap = {
  [CopyStatus.PENDING]: 'copy',
  [CopyStatus.COPYING]: 'copying..',
  [CopyStatus.COMPLETED]: 'copied!',
  [CopyStatus.FAILED]: 'failed!',
}

export interface CopyButtonProps {
  /**
   * The literal texture content that waiting to copy.
   */
  value: string
  /**
   * Map of copy status and displaying tip.
   * @default defaultStatusTipMap
   */
  statusTipMap?: Partial<ICopyStatusTipMap>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
  /**
   * Callback when an error ocurred while copying.
   * @param error
   * @returns
   */
  onError?: (error: unknown) => void
  /**
   * Callback when the button is clicked.
   * @param evt
   * @returns
   */
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export const CopyButton: React.FC<CopyButtonProps> = props => {
  const { value, statusTipMap = defaultStatusTipMap, className, style, onError } = props
  const [status, setStatus] = React.useState<CopyStatus>(CopyStatus.PENDING)

  const onClick = useEventCallback<React.MouseEventHandler<HTMLButtonElement>>(evt => {
    props.onClick?.(evt)

    if (status === CopyStatus.COPYING) return
    setStatus(CopyStatus.COPYING)

    copyToClipboard(value)
      .then((succeed: boolean): void => {
        if (succeed) {
          setStatus(CopyStatus.COMPLETED)
        } else {
          setStatus(CopyStatus.FAILED)
          onError?.(undefined)
        }
      })
      .catch(error => {
        setStatus(CopyStatus.FAILED)
        onError?.(error)
      })
  })

  React.useEffect(() => {
    if (status === CopyStatus.FAILED || status === CopyStatus.COMPLETED) {
      const timer = setTimeout(() => {
        setStatus(s => {
          switch (s) {
            case CopyStatus.PENDING:
            case CopyStatus.COPYING:
              return s
            case CopyStatus.COMPLETED:
            case CopyStatus.FAILED:
              return CopyStatus.PENDING
            default:
              return s
          }
        })
      }, 1000)
      return (): void => clearTimeout(timer)
    }
  }, [status])

  const tip: React.ReactNode = statusTipMap[status] ?? defaultStatusTipMap[status]
  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      disabled={status !== CopyStatus.PENDING}
      data-copy-status={status}
      className={cx(classes.container, className)}
      style={style}
      onClick={onClick}
    >
      {tip}
    </button>
  )
}

CopyButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  statusTipMap: PropTypes.any,
}
CopyButton.displayName = 'YozoraCopyButton'
