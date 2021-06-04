/* eslint-disable new-cap */
import load from 'load-script'
import type { MathJax } from './types'

let MathJaxPromise: Promise<MathJax> | null = null
export function loadMathJax(src: string): Promise<MathJax> {
  if (MathJaxPromise != null) return MathJaxPromise

  MathJaxPromise = new Promise<MathJax>(resolve => {
    load(src, function () {
      const gThis: any = typeof globalThis === 'undefined' ? window : globalThis
      resolve(gThis.MathJax)
    })
  }).catch(error => {
    console.error(`Oops! Cannot load MathJax from ${src}!`)
    throw error
  })
  return MathJaxPromise
}

let pendingScripts: unknown[] = []
let pendingCallbacks: Array<() => void> = []
let needsProcess = false

export function processMathJax(
  MathJax: MathJax,
  scriptNode: HTMLScriptElement,
  callback?: () => void,
): void {
  pendingScripts.push(scriptNode)
  if (callback != null) pendingCallbacks.push(callback)
  if (!needsProcess) {
    needsProcess = true
    setTimeout(realProcess, 0)
  }

  function realProcess(): void {
    MathJax.Hub.Queue(() => {
      // bak
      const oldElementScripts = MathJax.Hub.elementScripts

      // eslint-disable-next-line no-param-reassign
      MathJax.Hub.elementScripts = () => pendingScripts

      try {
        return MathJax.Hub.Process(null, () => {
          // Trigger all of the pending callbacks before clearing them out.
          pendingCallbacks.forEach(callback => void callback())

          pendingScripts = []
          pendingCallbacks = []
          needsProcess = false
        })
      } finally {
        // recover
        // eslint-disable-next-line no-param-reassign
        MathJax.Hub.elementScripts = oldElementScripts
      }
    })
  }
}
