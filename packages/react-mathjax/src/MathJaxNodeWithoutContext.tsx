import { isEqual } from '@guanghechen/equal'
import React from 'react'
import { MathError } from './MathError'
import type { IMathJax, TexLang } from './types'

interface IMathErrorProps {
  lang: TexLang
  formula: string
  inline: boolean
  error: string
}

interface IProps {
  MathJax: IMathJax
  language: TexLang
  formula: string
  inline: boolean
  className?: string
  style?: React.CSSProperties
  MathErrorRenderer?: React.ComponentType<IMathErrorProps>
}

interface IState {
  error: string | undefined
}

export class MathJaxNodeWithoutContext extends React.Component<IProps, IState> {
  public static readonly displayName = 'MathJaxNodeWithoutContext'

  protected readonly _nodeRef: React.RefObject<HTMLDivElement | null>
  protected readonly _typesettingRef: React.MutableRefObject<boolean>

  constructor(props: IProps) {
    super(props)

    this._nodeRef = { current: null }
    this._typesettingRef = { current: false }
    this.state = {
      error: undefined,
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.error !== nextState.error ||
      props.MathJax !== nextProps.MathJax ||
      props.language !== nextProps.language ||
      props.formula !== nextProps.formula ||
      props.inline !== nextProps.inline ||
      props.className !== nextProps.className ||
      props.MathErrorRenderer !== nextProps.MathErrorRenderer ||
      !isEqual(props.style, nextProps.style)
    )
  }

  public override render(): React.ReactElement {
    const { formula, inline, className, style, MathErrorRenderer = MathError } = this.props
    const { error } = this.state

    if (typeof error === 'string') {
      return (
        <MathErrorRenderer
          lang={this.props.language}
          formula={this.props.formula}
          inline={inline}
          error={error}
        />
      )
    }

    return React.createElement(
      inline ? 'span' : 'div',
      {
        ref: this._nodeRef,
        className,
        style,
      },
      inline ? `$${formula}$` : `$$${formula.replace(/\n/g, ' ')}$$`,
    )
  }

  // Render the math once the node is mounted.
  public override componentDidMount(): void {
    this._typeset()
  }

  public override componentDidUpdate(prevProps: Readonly<IProps>): void {
    const props = this.props
    if (
      props.formula !== prevProps.formula ||
      props.inline !== prevProps.inline ||
      props.MathJax !== prevProps.MathJax
    ) {
      this._typeset()
    }
  }

  public override componentWillUnmount(): void {
    this._onTypesetDone()
  }

  /**
   * Update math in the node
   * @param isForceUpdate
   */
  protected _typeset(): void | never {
    const { MathJax } = this.props
    if (!MathJax) {
      throw new Error(
        "Could not find MathJax while attempting typeset! Probably the MathJax script hasn't been loaded or MathJaxContextType.Provider is not in the hierarchy",
      )
    }

    const node = this._nodeRef.current
    if (node) {
      if (!this._typesettingRef.current) {
        this._typesettingRef.current = true
        void MathJax.startup.promise
          .then(() => {
            MathJax.typesetClear([node])
            return MathJax.typesetPromise([[node]])
          })
          .then(() => {
            this.setState({ error: undefined })
            this._onTypesetDone()
          })
          .catch((error: unknown) => {
            console.log('err:', error)
            const message = error instanceof Error ? error.message : String(error)
            this.setState({ error: `Typesetting failed: ${message}` })
            this._onTypesetDone()
          })
      }
    }
  }

  protected _onTypesetDone(): void {
    this._typesettingRef.current = false
  }
}
