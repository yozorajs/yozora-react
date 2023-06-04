import React from 'react'
import { errorBoundary } from './error-boundary'
import { evalCode } from './eval'
import type { ICodeTransformer } from './transform'
import { transformImports, transformJsx, transformTsx } from './transform'

const jsxConst = 'const _jsxFileName = "";'
const useStrictConst = /(['"])use strict\1;?/
const trimCode: ICodeTransformer = code => code.trim().replace(/;$/, '')
const spliceJsxConst: ICodeTransformer = code => code.replace(jsxConst, '').trim()
const spliceUseStrictConst: ICodeTransformer = code => code.replace(useStrictConst, '')
const addJsxConst: ICodeTransformer = code => jsxConst + code
const wrapReturn: ICodeTransformer = code => `return (${code})`

/**
 * render single jsx component
 */
export function generateElement(params: {
  code: string
  scope: Record<string, unknown>
  enabledTypeScript: boolean
  onError(error?: any): void
}): React.ComponentClass {
  const { code, scope, enabledTypeScript, onError } = params
  const transformed: string = compose(
    trimCode,
    enabledTypeScript ? transformTsx : transformJsx,
    trimCode,
    spliceJsxConst,
    spliceUseStrictConst,
    wrapReturn,
    transformImports,
    addJsxConst,
  )(code)
  return errorBoundary(evalCode(transformed, { React, ...scope }), onError)
}

/**
 * render multiple line jsx (or tsx) code, the main entry is `render()`
 */
export function renderElementAsync(params: {
  code: string
  scope: Record<string, unknown>
  enabledTypeScript: boolean
  onError(error?: any): void
  onSuccess(ErrorBoundary: React.ComponentClass): void
}): void {
  const { code, scope, enabledTypeScript, onError, onSuccess } = params
  const render = (element: React.FC | React.ReactNode): void => {
    if (typeof element === 'undefined') {
      onError(new SyntaxError('`render` must be called with valid JSX.'))
    } else {
      onSuccess(errorBoundary(element, onError))
    }
  }

  if (!/\brender\s*\(/.test(code)) {
    onError(new SyntaxError('No-Inline evaluations must call `render`.'))
    return
  }

  const transformCode = enabledTypeScript ? transformTsx : transformJsx
  const transformed = transformCode(code).trim()
  evalCode(transformed, { React, ...scope, render })
}

function compose(...transformers: ICodeTransformer[]): ICodeTransformer {
  return transformers.reduce((acc, currentFn) => code => currentFn(acc(code)))
}
