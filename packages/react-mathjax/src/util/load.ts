import type { IMathJax, IMathJaxConfig } from '../types'

let mathJaxPromise: Promise<IMathJax | null> | null = null

export function loadMathJax(
  mathJaxSrc: string,
  mathJaxConfig: IMathJaxConfig | undefined,
): Promise<IMathJax | null> {
  if (mathJaxPromise === null) {
    mathJaxPromise = new Promise<IMathJax | null>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve(null)
        return
      }

      const w = window as any
      if (mathJaxConfig && !w.MathJax) w.MathJax = mathJaxConfig

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = mathJaxSrc
      script.async = false

      script.addEventListener('load', () => {
        const mathjax = w.MathJax
        resolve(mathjax)
      })

      script.addEventListener('error', err => {
        reject(err)
      })

      const head = document.getElementsByTagName('head')
      head?.[0]?.appendChild?.(script)
    })
  }
  return mathJaxPromise
}

/** @deprecated Use `loadMathJax` instead. */
export const loadMathJax3 = loadMathJax
