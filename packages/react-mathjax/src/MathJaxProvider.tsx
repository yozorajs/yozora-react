import { isEqual } from '@guanghechen/equal'
import React from 'react'
import { MathJaxContextType, initialMathJaxContext } from './context'
import type { IMathJax, IMathJaxConfig, IMathJaxContext } from './types'
import { loadMathJax } from './util/load'

export interface IMathJaxProviderProps {
  /**
   * http / https url for loading mathjax.
   * @default 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'
   */
  mathjaxSrc?: string
  /**
   * MathJax config.
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

  protected _cancelLoad: (() => Promise<void>) | undefined

  constructor(props: IMathJaxProviderProps) {
    super(props)

    this._cancelLoad = undefined
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
    const { MathJax: mathJax } = this.state.context
    void this.clear().then(() => {
      mathJax?.texReset()
    })
  }

  protected async load(): Promise<void> {
    await this.clear()

    const {
      mathjaxSrc = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js',
      mathjaxConfig = defaultMathjaxConfig,
    } = this.props

    let cancelled = false

    const loadResult = loadMathJax(mathjaxSrc, mathjaxConfig).then(
      mathJax => {
        if (cancelled) return

        if (mathJax === null) {
          this.setState({ loaded: true, context: initialMathJaxContext })
          return
        }

        this.setState(
          prevState => ({
            loaded: true,
            context: { ...prevState.context, MathJax: mathJax },
          }),
          () => this.props.onLoad?.(mathJax),
        )
      },
      error => {
        if (cancelled) return
        this.setState({ loaded: true, context: initialMathJaxContext }, () => {
          this.props.onError?.(error)
        })
      },
    )

    this._cancelLoad = async () => {
      cancelled = true
      await loadResult
    }
  }

  protected async clear(): Promise<void> {
    if (this._cancelLoad) {
      await this._cancelLoad()
      this._cancelLoad = undefined
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
  tagformat: {
    number: (n: number) => n.toString(),
    tag: (tag: string) => '(' + tag + ')',
    id: (id: string) => 'mjx-eqn:' + id.replace(/\s/g, '_'),
    url: (id: string, base: string) => base + '#' + encodeURIComponent(id),
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
