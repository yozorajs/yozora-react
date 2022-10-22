/* eslint-disable new-cap */
import type { IMathJax, IMathJaxRenderCallback } from '../types'

let _isProcessing = false
let _pendingScripts: unknown[] = []
let _pendingCallbacks: Array<IMathJaxRenderCallback | undefined> = []

export function processMathJax(
  MathJax: IMathJax,
  scriptNode: HTMLScriptElement,
  callback?: () => void,
): void {
  _pendingScripts.push(scriptNode)
  if (callback) _pendingCallbacks.push(callback)
  if (!_isProcessing) {
    _isProcessing = true
    setTimeout(() => realProcess(MathJax), 0)
  }
}

function realProcess(MathJax: IMathJax): void {
  MathJax.Hub.Queue(() => {
    const oldElementScripts = MathJax.Hub.elementScripts
    // eslint-disable-next-line no-param-reassign
    MathJax.Hub.elementScripts = () => _pendingScripts

    try {
      return MathJax.Hub.Process(null, () => {
        // Trigger all of the pending callbacks before clearing them out.
        _pendingCallbacks.forEach(callback => callback?.())

        _pendingScripts = []
        _pendingCallbacks = []
        _isProcessing = false
      })
    } finally {
      // recover
      // eslint-disable-next-line no-param-reassign
      MathJax.Hub.elementScripts = oldElementScripts
    }
  })
}

export function cancelProcessMathJax(MathJax: IMathJax, scriptNode: HTMLScriptElement): void {
  const index = _pendingScripts.indexOf(scriptNode)
  if (index >= 0) {
    _pendingScripts.splice(index, 1)
    _pendingCallbacks.splice(index, 1)
  } else {
    const jax = MathJax.Hub.getJaxFor(scriptNode)
    jax?.Remove()
  }
}
