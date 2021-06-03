/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import React from 'react'
import { loadMathJax } from './util'
import type {
  MathJaxContextData,
  MathJaxProviderProps,
  MathJaxProviderState,
} from './types'

/**
 * Mathjax provider
 */
export class MathJaxProvider extends React.Component<
  MathJaxProviderProps,
  MathJaxProviderState
> {
  public static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.node,
    mathjaxSrc: PropTypes.string,
    mathjaxConfig: PropTypes.object,
    mathjaxOptions: PropTypes.object,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  public static defaultProps = {
    loading: null,
    mathjaxSrc:
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_SVG',
    mathjaxConfig: {
      tex2jax: { inlineMath: [] },
      TeX: { equationNumbers: { autoNumber: 'AMS' } },
      SVG: { blacker: 1 },
      showMathMenu: false,
      showMathMenuMSIE: false,
    },
  }

  public static childContextTypes = {
    language: PropTypes.oneOf(['tex', 'asciimath']).isRequired,
    MathJax: PropTypes.object,
  }

  constructor(props: MathJaxProviderProps) {
    super(props)
    this.state = { loaded: false, MathJax: null }
  }

  public getChildContext(): MathJaxContextData {
    return {
      language: this.props.mathjaxOptions?.language ?? 'tex',
      MathJax: this.state.MathJax,
    }
  }

  public render(): React.ReactNode {
    if (!this.state.loaded && this.props.loading !== null) {
      return this.props.loading
    }
    return this.props.children
  }

  public componentDidMount(): void {
    // Waiting MathJax loaded.
    loadMathJax(this.props.mathjaxSrc!).then(MathJax => {
      const { mathjaxConfig, mathjaxOptions, onLoad } = this.props
      const { processSectionDelay = 0 } = mathjaxOptions ?? {}

      MathJax.Hub.Config(mathjaxConfig)
      MathJax.Hub.Register.StartupHook('End', () => {
        // eslint-disable-next-line no-param-reassign
        MathJax.Hub.processSectionDelay = processSectionDelay

        if (onLoad != null) onLoad(MathJax)

        this.setState({ loaded: true, MathJax })
      })

      MathJax.Hub.Register.MessageHook(
        'Math Processing Error',
        (error: any) => {
          if (this.props.onError) {
            this.props.onError(MathJax, error)
          }
        },
      )
    })
  }
}
