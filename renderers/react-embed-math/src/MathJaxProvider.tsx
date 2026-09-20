import { isEqual } from '@guanghechen/equal'
import React from 'react'
import { MathJaxContextType, initialMathJaxContext } from './context'
import type { IMathJax, IMathJaxConfig, IMathJaxContext } from './types'
import { loadMathJax } from './util/load'

export interface IMathJaxProviderProps {
  /**
   * URL for the page's shared MathJax instance. Must match other providers on the page.
   * @default 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'
   */
  mathjaxSrc?: string
  /**
   * Initialization config for the page's shared MathJax instance; fixed after loading starts.
   * A different URL or configuration is reported through onError. Failed loads can be retried.
   */
  mathjaxConfig?: IMathJaxConfig
  /**
   * Contents / Animation displayed while MathJax is loading.
   * @default null
   */
  loading?: React.ReactNode
  /**
   * Sub components.
   */
  children?: React.ReactNode
  /**
   * Triggered when MathJax has loaded.
   * @param mathJax
   */
  onLoad?(mathJax: IMathJax): void
  /**
   * Triggered when MathJax loading fails.
   * @param error
   */
  onError?(error: unknown): void
}

interface IState {
  loaded: boolean
  context: IMathJaxContext
}

export class MathJaxProvider extends React.Component<IMathJaxProviderProps, IState> {
  public static readonly displayName = 'MathJaxProvider'

  protected _loadVersion = 0

  public constructor(props: IMathJaxProviderProps) {
    super(props)

    this.state = {
      loaded: false,
      context: initialMathJaxContext,
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IMathJaxProviderProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.loaded !== nextState.loaded ||
      !isEqual(state.context, nextState.context) ||
      props.loading !== nextProps.loading ||
      props.children !== nextProps.children ||
      props.mathjaxSrc !== nextProps.mathjaxSrc ||
      !isEqual(props.mathjaxConfig, nextProps.mathjaxConfig)
    )
  }

  public override render(): React.ReactElement {
    const { loading = null, children } = this.props
    const { loaded, context } = this.state

    // Try to render loading animation / contents while MathJax is not loaded.
    if (!loaded && loading) return <React.Fragment>{loading}</React.Fragment>

    return <MathJaxContextType.Provider value={context}>{children}</MathJaxContextType.Provider>
  }

  public override componentDidMount(): void {
    void this.load()
  }

  public override componentDidUpdate(prevProps: Readonly<IMathJaxProviderProps>): void {
    const props = this.props
    if (
      props.mathjaxSrc !== prevProps.mathjaxSrc ||
      !isEqual(props.mathjaxConfig, prevProps.mathjaxConfig)
    ) {
      void this.load()
    }
  }

  public override componentWillUnmount(): void {
    /** The page owns the engine; unmounting only cancels this provider's subscription. */
    this._loadVersion += 1
  }

  protected async load(): Promise<void> {
    const version = ++this._loadVersion
    const {
      mathjaxSrc = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js',
      mathjaxConfig = defaultMathjaxConfig,
    } = this.props
    this.setState({ loaded: false, context: initialMathJaxContext })

    try {
      const mathJax = await loadMathJax(mathjaxSrc, mathjaxConfig)
      if (version !== this._loadVersion) return
      this.setState(
        () =>
          version === this._loadVersion
            ? {
                loaded: true,
                context: { ...initialMathJaxContext, MathJax: mathJax },
              }
            : null,
        () => {
          if (version === this._loadVersion && mathJax) this.props.onLoad?.(mathJax)
        },
      )
    } catch (error: unknown) {
      if (version !== this._loadVersion) return
      this.setState(
        () =>
          version === this._loadVersion ? { loaded: true, context: initialMathJaxContext } : null,
        () => {
          if (version === this._loadVersion) this.props.onError?.(error)
        },
      )
    }
  }
}

const defaultMathjaxConfig: IMathJaxConfig = {
  loader: {
    load: [
      '[tex]/ams',
      '[tex]/color',
      '[tex]/colortbl',
      '[tex]/tagformat',
      '[tex]/unicode',
      'input/tex',
      'output/chtml',
    ],
  },
  tex: {
    tags: 'ams',
    packages: {
      '[+]': ['base', 'ams', 'color', 'colortbl', 'tagformat', 'unicode'],
    },
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    processEnvironments: true,
    processRefs: true,
  },
  svg: {
    fontCache: 'global',
  },
  options: {
    skipHtmlTags: ['noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex2jax_ignore',
    renderActions: {
      addMenu: [],
    },
  },
}
