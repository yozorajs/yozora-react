import PropTypes from 'prop-types'
import React from 'react'
import { generateElement, renderElementAsync } from './element'

export interface ICodeRendererJsxProps {
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
   * Whether if to enable typescript.
   * @default true
   */
  enabledTypeScript?: boolean
  /**
   * Error callback
   */
  onError(error: string | null): void
}

export const CodeRendererJsx: React.FC<ICodeRendererJsxProps> = props => {
  const { code, inline, scope, enabledTypeScript = true, onError } = props
  const [Element, setElement] = React.useState<React.ElementType | null>(null)

  const transpile = React.useCallback(
    (code: string): void => {
      const handleError = (error: unknown): void => {
        const errInfo = String(error ?? '')
        onError(errInfo)
        setElement(null)
      }

      const handleSuccess = (element: React.ElementType | null): void => {
        onError(null)
        setElement(() => element)
      }

      try {
        if (inline) {
          const element = generateElement({
            code,
            scope: scope!,
            enabledTypeScript,
            onError: handleError,
          })
          handleSuccess(element)
        } else {
          // Reset output for async (no inline) evaluation
          setElement(null)
          renderElementAsync({
            code,
            scope: scope!,
            enabledTypeScript,
            onError: handleError,
            onSuccess: handleSuccess,
          })
        }
      } catch (error: any) {
        handleError(error)
      }
    },
    [inline, scope, enabledTypeScript, onError],
  )

  React.useEffect((): void => transpile(code), [code, transpile])
  return Element ? <Element /> : null
}

CodeRendererJsx.defaultProps = {
  scope: {},
}

CodeRendererJsx.propTypes = {
  code: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  scope: PropTypes.any,
  onError: PropTypes.func.isRequired,
}
CodeRendererJsx.displayName = 'YozoraCodeRendererJsx'
