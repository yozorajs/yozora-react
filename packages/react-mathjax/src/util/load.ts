import loadScript from 'load-script'
import type { IMathJax } from '../types'

type IAllowedAttributes = 'type' | 'charset' | 'async' | 'text'
type IOptions = Partial<Pick<HTMLScriptElement, IAllowedAttributes>> & {
  attrs?: Record<string, string>
}

let MathJaxPromise: Promise<IMathJax> | null = null
export const loadMathJax = (params: {
  mathjaxSrc: string
  loadOptions?: IOptions
}): Promise<IMathJax> => {
  const { mathjaxSrc, loadOptions = {} } = params
  if (MathJaxPromise === null) {
    MathJaxPromise = new Promise<IMathJax>(resolve => {
      if (loadOptions) {
        loadScript(mathjaxSrc, loadOptions, function () {
          const gThis: any = typeof globalThis === 'undefined' ? window : globalThis
          resolve(gThis.MathJax)
        })
      } else {
        loadScript(mathjaxSrc, function () {
          const gThis: any = typeof globalThis === 'undefined' ? window : globalThis
          resolve(gThis.MathJax)
        })
      }
    }).catch(error => {
      console.error(`Oops! Cannot load MathJax from ${mathjaxSrc}!`)
      throw error
    })
  }
  return MathJaxPromise
}
