/* eslint-disable new-cap */
import { useEventCallback } from '@guanghechen/react-hooks'
import React from 'react'
import { MathJaxContextType, initialMathJaxContext } from './Context'
import type { IMathJax, IMathJaxConfig, IMathJaxContext, MathJaxLanguage } from './types'
import { loadMathJax } from './util/load'

export interface IMathJaxProviderProps {
  /**
   * Sub components.
   */
  children?: React.ReactNode
  /**
   * Contents / Animation displayed at waiting MathJax loading.
   * @default null
   */
  loading?: React.ReactNode
  /**
   * http / https url for loading mathjax.
   * @default 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
   */
  mathjaxSrc?: string
  /**
   * MathJax config
   */
  mathjaxConfig?: IMathJaxConfig
  /**
   * MathJax options.
   */
  mathjaxOptions?: {
    /**
     * Delay between updates.
     * @default 0
     */
    processSectionDelay?: number
    /**
     * Type of the formula string.
     * @default 'tex'
     */
    language?: MathJaxLanguage
  }
  /**
   * Triggered on mathjax loaded.
   * @param MathJax
   */
  onLoad?(MathJax: IMathJax): void
  /**
   * Triggered on mathjax thrown an error.
   *
   * @param MathJax
   * @param error
   */
  onError?(MathJax: IMathJax, error: any): void
}

const defaultProps: IMathJaxProviderProps = {
  loading: null,
  //
  mathjaxSrc: 'https://cdn.jsdelivr.net/npm/mathjax@2.7.9/MathJax.js?config=TeX-MML-AM_CHTML',
  // 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_SVG',
  mathjaxConfig: {
    tex2jax: { inlineMath: [] },
    SVG: { blacker: 1 },
    showMathMenu: false,
    showMathMenuMSIE: false,
  },
}

export const MathJaxProvider: React.FC<IMathJaxProviderProps> = props => {
  const { loading, mathjaxSrc, mathjaxConfig, mathjaxOptions, children } = {
    ...props,
    ...defaultProps,
  }
  const { processSectionDelay = 0 } = mathjaxOptions ?? {}

  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [context, setContext] = React.useState<IMathJaxContext>(initialMathJaxContext)
  const onLoad = useEventCallback((MathJax: IMathJax) => props.onLoad?.(MathJax))
  const onError = useEventCallback((MathJax: IMathJax, error: unknown) =>
    props.onError?.(MathJax, error),
  )

  React.useEffect(() => {
    let cancelled = false
    type IResult = [IMathJax, () => void]
    const promise = loadMathJax({ mathjaxSrc: mathjaxSrc! }).then<IResult>((MathJax): IResult => {
      if (cancelled) return [MathJax, () => {}]

      MathJax.Hub.Config(mathjaxConfig)
      MathJax.Hub.Register.StartupHook('End', function onStartup(): void {
        if (!cancelled) {
          // eslint-disable-next-line no-param-reassign
          MathJax.Hub.processSectionDelay = processSectionDelay
          setLoaded(true)
          setContext(context => ({ ...context, MathJax }))
        }
        onLoad?.(MathJax)
      })
      MathJax.Hub.Register.MessageHook('Math Processing Error', (error: any) => {
        onError?.(MathJax, error)
      })

      const unregister = (): void => {
        const jaxList = MathJax.Hub.getAllJax()
        for (const jax of jaxList) {
          const script = jax.SourceElement()
          jax.Remove()
          const preview = script.previousSibling
          if (preview && preview.className === 'MathJax_Preview')
            preview.parentNode.removeChild(preview)
        }
      }
      return [MathJax, unregister]
    })

    return () => {
      cancelled = true
      void promise.then(([, unregister]) => unregister())
    }
  }, [mathjaxSrc, mathjaxConfig, processSectionDelay, onLoad, onError])

  // Try to render loading animation / contents when the MathJax is not loaded.
  if (!loaded && loading) return <React.Fragment>{loading}</React.Fragment>

  return <MathJaxContextType.Provider value={context}>{children}</MathJaxContextType.Provider>
}
