import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
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
  scope?: Readonly<Record<string, unknown>>
  /**
   * Error callback
   */
  onError(error: string | null): void
}

/**
 * Renderer jsx code
 *
 * @param props
 */
export function CodeRendererJsx(
  props: CodeRendererJsxProps,
): React.ReactElement | null {
  const { code, inline, scope, onError } = props
  const [Element, setElement] = useState<React.ElementType | null>(null)

  const transpile = useCallback(
    (code: string): void => {
      const handleError = (error: any): void => {
        const errInfo: string = (error || '').toString()
        onError(errInfo)
        setElement(null)
      }

      const handleSuccess = (element: React.ElementType | null): void => {
        onError(null)
        setElement(() => element)
      }

      try {
        if (inline) {
          const element = renderElement(code, scope!, handleError)
          handleSuccess(element)
        } else {
          // Reset output for async (no inline) evaluation
          setElement(null)
          renderElementAsync(code, scope!, handleError, handleSuccess)
        }
      } catch (error: any) {
        handleError(error)
      }
    },
    [inline, scope, onError],
  )

  useEffect(() => {
    transpile(code)
  }, [code, transpile])

  if (Element == null) return null
  return <Element />
}

CodeRendererJsx.defaultProps = {
  scope: { styled },
}

CodeRendererJsx.propTypes = {
  code: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  scope: PropTypes.object,
  onError: PropTypes.func.isRequired,
}

CodeRendererJsx.displayName = 'YozoraCodeRendererJsx'
export default CodeRendererJsx
