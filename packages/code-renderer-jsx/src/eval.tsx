import React from 'react'
import errorBoundary from './error-boundary'
import transform, { _poly, _polyKey } from './transform'

/**
 * Eval Jsx code
 *
 * @param code
 * @param scope
 *
 * @see https://github.com/FormidableLabs/react-live/blob/2d8246b920813e4725a6037c94d9a4d00dd8cd2a/src/utils/transpile/evalCode.js
 */
export function evalCode(
  code: string,
  scope: Record<string, unknown>,
): React.ReactElement {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])

  // eslint-disable-next-line no-new-func
  const f = new Function(_polyKey, 'React', ...scopeKeys, code)
  return f(_poly, React, ...scopeValues)
}

/**
 * render single jsx component
 *
 * @param code
 * @param scope
 * @param onError
 */
export function renderElement(
  code: string,
  scope: Record<string, unknown>,
  onError: (error?: any) => void,
): React.ComponentClass {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '')

  // NOTE: Workaround for classes and arrow functions.
  const transformed = transform(`return (${codeTrimmed})`).trim()
  return errorBoundary(evalCode(transformed, scope), onError)
}

/**
 * render multiple line jsx code, the main entry is `render()`
 *
 * @param code
 * @param scope
 * @param errorCallback
 */
export function renderElementAsync(
  code: string,
  scope: Record<string, unknown>,
  onError: (error?: any) => void,
  onSuccess: (ErrorBoundary: React.ComponentClass) => void,
): void {
  const render = (element: React.FC | React.ReactNode): void => {
    if (typeof element === 'undefined') {
      onError(new SyntaxError('`render` must be called with valid JSX.'))
    } else {
      onSuccess(errorBoundary(element, onError))
    }
  }

  if (!/\brender\s*\(/.test(code)) {
    return void onError(
      new SyntaxError('No-Inline evaluations must call `render`.'),
    )
  }

  const transformed = transform(code).trim()
  evalCode(transformed, { ...scope, render })
}
