import type {
  MathJax2Config,
  MathJax2Object,
  MathJax3Config,
  MathJax3Object,
} from 'better-react-mathjax'
import { MathJaxContext } from 'better-react-mathjax'
import React from 'react'

export type ITypesettingFunction =
  | 'tex2chtml'
  | 'tex2chtmlPromise'
  | 'tex2svg'
  | 'tex2svgPromise'
  | 'tex2mml'
  | 'tex2mmlPromise'
  | 'mathml2chtml'
  | 'mathml2chtmlPromise'
  | 'mathml2svg'
  | 'mathml2svgPromise'
  | 'mathml2mml'
  | 'mathml2mmlPromise'
  | 'asciimath2chtml'
  | 'asciimath2chtmlPromise'
  | 'asciimath2svg'
  | 'asciimath2svgPromise'
  | 'asciimath2mml'
  | 'asciimath2mmlPromise'

interface IMathjaxProviderStaticProps {
  /**
   * Sub components.
   */
  children?: React.ReactNode
  /**
   * http / https url for loading mathjax.
   * @example 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
   */
  src?: string
  /**
   * Controls whether the content of the MathJax component should be hidden until after typesetting is finished.
   * @default 'first'
   * @see https://github.com/fast-reflexes/better-react-mathjax#hideuntiltypeset-first--every--undefined
   */
  hideUntilTypeset?: 'first' | 'every'
  /**
   * Controls how typesetting by MathJax is done in the DOM.
   * @default 'post'
   * @see https://github.com/fast-reflexes/better-react-mathjax#rendermode-pre--post--undefined
   */
  renderMode?: 'pre' | 'post'
  /**
   * Triggered on mathjax loaded.
   */
  onLoad?(): void
  /**
   * Triggered on mathjax thrown an error.
   */
  onError?(error: unknown): void
}

interface IMathjax2Options {
  version: 2
  config?: MathJax2Config
  onStartup?(mathJax: MathJax2Object): void
}

interface IMathjax3Options {
  version?: 3
  config?: MathJax3Config
  onStartup?(mathJax: MathJax3Object): void
}

export type IMathJaxProviderProps = IMathjaxProviderStaticProps &
  (IMathjax2Options | IMathjax3Options)

export const defaultMathJax2Options: Readonly<IMathjax2Options> = {
  version: 2,
  config: {
    tex2jax: { inlineMath: [] },
    SVG: { blacker: 1 },
    showMathMenu: false,
    showMathMenuMSIE: false,
  },
}

export const defaultMathJax3Options: Readonly<IMathjax3Options> = {
  version: 3,
  config: {
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'code', 'a'],
    },
    chtml: {
      scale: 1,
    },
    startup: {
      // Don't perform an initial typeset of the page when MathJax loads.
      // Our React components will trigger typesetting as needed.
      typeset: false,
    },
  },
}

export class MathJaxProvider extends React.PureComponent<IMathJaxProviderProps> {
  public static readonly defaultProps: IMathJaxProviderProps = {
    ...defaultMathJax3Options,
    hideUntilTypeset: 'first',
    renderMode: 'post',
  }

  public override render(): React.ReactElement {
    const { version, config, src, children, onLoad, onStartup, onError } = this
      .props as IMathjax3Options & IMathjaxProviderStaticProps
    return (
      <MathJaxContext
        version={version}
        config={config}
        src={src}
        onLoad={onLoad}
        onStartup={onStartup}
        onError={onError}
      >
        {children}
      </MathJaxContext>
    )
  }
}
