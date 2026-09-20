import { isEqual } from '@guanghechen/equal'
import type { IMathJax, IMathJaxConfig } from '../types'

/** Share ownership even when multiple copies of this package are loaded on the page. */
const LOAD_KEY = Symbol.for('@yozora/react-embed-math/load')

interface IMathJaxLoad {
  readonly src: string
  readonly config: IMathJaxConfig
  readonly promise: Promise<IMathJax>
}

interface IMathJaxWindow extends Window {
  MathJax?: IMathJax | IMathJaxConfig
  [LOAD_KEY]?: IMathJaxLoad
}

/** Share one initialization per page; a failed attempt can be retried by a later call. */
export function loadMathJax(
  mathJaxSrc: string,
  mathJaxConfig: IMathJaxConfig | undefined,
): Promise<IMathJax | null> {
  if (typeof window === 'undefined') return Promise.resolve(null)

  const w = window as IMathJaxWindow
  let src: string
  try {
    src = new URL(mathJaxSrc, w.document.baseURI).href
  } catch (error: unknown) {
    return Promise.reject(error)
  }

  const config = mathJaxConfig ?? {}
  const current = w[LOAD_KEY]
  if (current) {
    if (current.src === src && isEqual(current.config, config)) return current.promise
    return Promise.reject(
      new Error('MathJax is already loading or loaded with a different URL or configuration.'),
    )
  }

  if (w.MathJax !== undefined) {
    return Promise.reject(
      new Error(
        'MathJax already exists outside this loader. Pass its configuration to MathJaxProvider, or provide the existing instance through MathJaxContextType.Provider.',
      ),
    )
  }

  /** MathJax mutates its configuration, so neither the caller nor the cache can share that copy. */
  const snapshot = copyConfig(config)
  const load: IMathJaxLoad = {
    src,
    config: snapshot,
    promise: loadScript(src, copyConfig(snapshot)).catch((error: unknown) => {
      if (w[LOAD_KEY] === load) delete w[LOAD_KEY]
      throw error
    }),
  }
  w[LOAD_KEY] = load
  return load.promise
}

/** @deprecated Use `loadMathJax` instead. */
export const loadMathJax3 = loadMathJax

function loadScript(src: string, config: IMathJaxConfig): Promise<IMathJax> {
  const w = window as IMathJaxWindow
  return new Promise<IMathJax>((resolve, reject) => {
    const script = w.document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = false
    w.MathJax = config

    function removeListeners(): void {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }

    function fail(error: unknown): void {
      removeListeners()
      script.remove()
      /** Never remove a global installed by another owner while this attempt was pending. */
      if (w.MathJax === config || w.MathJax?.config === config) delete w.MathJax
      reject(error)
    }

    function onLoad(): void {
      removeListeners()
      const mathJax = w.MathJax as IMathJax | undefined
      if (!mathJax?.startup?.promise) {
        fail(new Error('MathJax loaded without exposing a startup promise.'))
        return
      }
      if (mathJax.config !== config) {
        fail(
          new Error('The MathJax global was replaced outside this loader during initialization.'),
        )
        return
      }
      void mathJax.startup.promise.then(() => resolve(mathJax), fail)
    }

    function onError(): void {
      fail(new Error(`Failed to load MathJax script: ${src}`))
    }

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    try {
      w.document.head.appendChild(script)
    } catch (error: unknown) {
      fail(error)
    }
  })
}

/** Copy configuration containers while preserving callbacks and host objects such as DOM nodes. */
function copyConfig<T>(value: T): T {
  if (Array.isArray(value)) return value.map(item => copyConfig(item)) as T
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, copyConfig(item)]),
    ) as T
  }
  return value
}
