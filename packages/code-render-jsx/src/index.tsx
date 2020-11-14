import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { renderElement, renderElementAsync } from './eval'


/**
 * Props of CodeRendererJsx
 */
export interface CodeRendererJsxProps {
  /**
   * Source code content
   */
  code: string
  /**
   * Inline / Block mode
   *
   * - inline: return React.ReactNode directly
   * - block: call `render()` with React.ReactNode explicitly
   */
  inline: boolean
  /**
   * Additional accessible variables
   */
  scope?: Record<string, unknown>
  /**
   * Error callback
   */
  onError: (error: string | null) => void
}


/**
 * Renderer jsx code
 *
 * @param props
 */
export function CodeRendererJsx(props: CodeRendererJsxProps): React.ReactElement | null {
  const { code, inline, scope = {}, onError } = props
  const [Element, setElement] = useState<React.ElementType | null>(null)

  const transpile = useCallback((code: string): void => {
    const handleError = (error: any) => {
      const errInfo: string = (error || '').toString()
      onError(errInfo)
      setElement(null)
    }

    const handleSuccess = (element: React.ElementType | null) => {
      onError(null)
      setElement(() => element)
    }

    try {
      if (inline) {
        const element = renderElement(code, scope, handleError)
        handleSuccess(element)
      } else {
        // Reset output for async (no inline) evaluation
        setElement(null)
        renderElementAsync(code, scope, handleError, handleSuccess)
      }
    } catch (error: any) {
      handleError(error)
    }
  }, [inline, scope, onError])

  useEffect(() => {
    transpile(code)
  }, [code, transpile])

  if (Element == null) return null
  return <Element />
}


CodeRendererJsx.displayName = 'CodeRendererJsx'


CodeRendererJsx.propTypes = {
  code: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  scope: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
}


export default CodeRendererJsx
