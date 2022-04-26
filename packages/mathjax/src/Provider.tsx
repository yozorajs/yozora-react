/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import React from 'react'
import { MathJaxContext, initialMathJaxContextValue } from './Context'
import type { MathJaxProviderProps, MathJaxProviderState } from './types'
import { loadMathJax } from './util'

/**
 * Mathjax provider
 */
export class MathJaxProvider extends React.Component<MathJaxProviderProps, MathJaxProviderState> {
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
      SVG: { blacker: 1 },
      showMathMenu: false,
      showMathMenuMSIE: false,
    },
  }

  constructor(props: MathJaxProviderProps) {
    super(props)
    this.state = {
      loaded: false,
      context: { ...initialMathJaxContextValue },
    }
  }

  public override render(): React.ReactNode {
    // Try to render loading animation / contents when the MathJax is not loaded.
    if (!this.state.loaded && this.props.loading) {
      return this.props.loading
    }

    return (
      <MathJaxContext.Provider value={this.state.context}>
        {this.props.children}
      </MathJaxContext.Provider>
    )
  }

  public override componentDidMount(): void {
    // Waiting MathJax loaded.
    void loadMathJax(this.props.mathjaxSrc!).then(MathJax => {
      const { mathjaxConfig, mathjaxOptions, onLoad } = this.props
      const { processSectionDelay = 0 } = mathjaxOptions ?? {}

      MathJax.Hub.Config(mathjaxConfig)
      MathJax.Hub.Register.StartupHook('End', () => {
        // eslint-disable-next-line no-param-reassign
        MathJax.Hub.processSectionDelay = processSectionDelay

        if (onLoad != null) onLoad(MathJax)

        this.setState(state => ({
          loaded: true,
          context: { ...state.context, MathJax },
        }))
      })

      MathJax.Hub.Register.MessageHook('Math Processing Error', (error: any) => {
        if (this.props.onError) {
          this.props.onError(MathJax, error)
        }
      })
    })
  }
}
