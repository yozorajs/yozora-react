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

export interface IMathJaxNodeWithoutContextProps {
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

export class MathJaxNodeWithoutContext extends React.Component<
  IMathJaxNodeWithoutContextProps,
  IState
> {
  public static readonly displayName = 'MathJaxNodeWithoutContext'

  protected readonly _nodeRef: React.RefObject<HTMLDivElement | null>
  protected readonly _typesettingRef: React.MutableRefObject<boolean>

  public constructor(props: IMathJaxNodeWithoutContextProps) {
    super(props)

    this._nodeRef = { current: null }
    this._typesettingRef = { current: false }
    this.state = {
      error: undefined,
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IMathJaxNodeWithoutContextProps>,
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

  public override getSnapshotBeforeUpdate(
    prevProps: Readonly<IMathJaxNodeWithoutContextProps>,
  ): null {
    if (
      this.props.formula !== prevProps.formula ||
      this.props.inline !== prevProps.inline ||
      this.props.MathJax !== prevProps.MathJax
    ) {
      this._clear(prevProps.MathJax)
    }
    return null
  }

  public override componentDidUpdate(prevProps: Readonly<IMathJaxNodeWithoutContextProps>): void {
    const props = this.props
    if (
      props.formula !== prevProps.formula ||
      props.inline !== prevProps.inline ||
      props.MathJax !== prevProps.MathJax
    ) {
      if (this.state.error !== undefined) {
        /** The error view removes the node ref; retry only after the formula node is restored. */
        this.setState({ error: undefined }, () => this._typeset())
      } else {
        this._typeset()
      }
    }
  }

  public override componentWillUnmount(): void {
    this._clear(this.props.MathJax)
    this._onTypesetDone()
  }

  /**
   * Update math in the node
   */
  protected _typeset(): void | never {
    const { MathJax } = this.props
    if (!MathJax) {
      throw new Error(
        "Could not find MathJax while attempting typeset! Probably the MathJax script hasn't been loaded or MathJaxContextType.Provider is not in the hierarchy",
      )
    }

    const node = this._nodeRef.current
    if (node && !this._typesettingRef.current) {
      this._typesettingRef.current = true
      void MathJax.typesetPromise([node])
        .then(() => {
          this.setState({ error: undefined })
          this._onTypesetDone()
        })
        .catch((error: unknown) => {
          MathJax.typesetClear([node])
          const message = error instanceof Error ? error.message : String(error)
          this.setState({ error: `Typesetting failed: ${message}` })
          this._onTypesetDone()
        })
    }
  }

  protected _clear(mathJax: IMathJax): void {
    const node = this._nodeRef.current
    if (node) mathJax.typesetClear([node])
  }

  protected _onTypesetDone(): void {
    this._typesettingRef.current = false
  }
}
