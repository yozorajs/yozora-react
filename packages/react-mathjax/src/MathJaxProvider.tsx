import { isEqual } from '@guanghechen/equal'
import PropTypes from 'prop-types'
import React from 'react'
import { MathJaxContextType, initialMathJaxContext } from './context'
import type { IMathJax3, IMathJaxConfig3, IMathJaxContext } from './types'
import { loadMathJax3 } from './util/load'

interface IProps {
  /**
   * http / https url for loading mathjax.
   * @default 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax3.js?config=TeX-MML-AM_CHTML'
   */
  mathjaxSrc?: string
  /**
   * MathJax3 config
   */
  mathjaxConfig?: IMathJaxConfig3
  /**
   * Contents / Animation displayed at waiting MathJax3 loading.
   * @default null
   */
  loading?: React.ReactNode
  /**
   * Sub components.
   */
  children?: React.ReactNode
  /**
   * Triggered on mathjax loaded.
   * @param MathJax3
   */
  onLoad?(MathJax3: IMathJax3): void
  /**
   * Triggered on mathjax thrown an error.
   *
   * @param MathJax3
   * @param error
   */
  onError?(MathJax3: IMathJax3, error: any): void
}

interface IState {
  loaded: boolean
  context: IMathJaxContext
}

export class MathJaxProvider extends React.Component<IProps, IState> {
  public static readonly displayName = 'MathJaxProvider'
  public static readonly propTypes = {
    mathjaxSrc: PropTypes.string,
    mathjaxConfig: PropTypes.object,
    loading: PropTypes.node,
    children: PropTypes.node,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  protected _cancelLoad: (() => Promise<void>) | undefined

  constructor(props: IProps) {
    super(props)

    this._cancelLoad = undefined
    this.state = {
      loaded: false,
      context: initialMathJaxContext,
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IProps>,
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

    // Try to render loading animation / contents when the MathJax3 is not loaded.
    if (!loaded && loading) return <React.Fragment>{loading}</React.Fragment>

    return <MathJaxContextType.Provider value={context}>{children}</MathJaxContextType.Provider>
  }

  public override componentDidMount(): void {
    void this.load()
  }

  public override componentDidUpdate(prevProps: Readonly<IProps>): void {
    const props = this.props
    if (
      props.mathjaxSrc !== prevProps.mathjaxSrc ||
      !isEqual(props.mathjaxConfig, prevProps.mathjaxConfig)
    ) {
      void this.load()
    }
  }

  public override componentWillUnmount(): void {
    const { MathJax3 } = this.state.context
    void this.clear().then(() => {
      MathJax3?.texReset()
    })
  }

  protected async load(): Promise<void> {
    await this.clear()

    const {
      mathjaxSrc = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js',
      mathjaxConfig = defaultMathjaxConfig,
    } = this.props

    let cancelled = false

    type IResult = () => void
    const loadResult: Promise<IResult> = loadMathJax3(mathjaxSrc, mathjaxConfig).then<IResult>(
      (MathJax3): IResult => {
        if (cancelled) return (): void => {}

        this.setState(prevState => ({
          loaded: true,
          context: { ...prevState.context, MathJax3: MathJax3 },
        }))
        return (): void => {}
      },
    )

    this._cancelLoad = async () => {
      cancelled = true
      const unregister = await loadResult
      unregister()
    }
  }

  protected async clear(): Promise<void> {
    if (this._cancelLoad) {
      await this._cancelLoad()
      this._cancelLoad = undefined
    }
  }

  protected readonly onLoad = (MathJax3: IMathJax3): void => {
    this.props.onLoad?.(MathJax3)
  }

  protected readonly onError = (MathJax3: IMathJax3, error: unknown): void => {
    this.props.onError?.(MathJax3, error)
  }
}

const defaultMathjaxConfig: IMathJaxConfig3 = {
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
