import type { IMathJax3, IMathJaxConfig3 } from '../types'

let MathJax3Promise: Promise<IMathJax3 | null> | null = null
export function loadMathJax3(
  mathjax3Src: string,
  mathjax3Config: IMathJaxConfig3 | undefined,
): Promise<IMathJax3 | null> {
  if (MathJax3Promise === null) {
    MathJax3Promise = new Promise<IMathJax3 | null>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve(null)
        return
      }

      const w = window as any
      if (mathjax3Config && !w.MathJax) w.MathJax = mathjax3Config

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = mathjax3Src
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
  return MathJax3Promise
}
