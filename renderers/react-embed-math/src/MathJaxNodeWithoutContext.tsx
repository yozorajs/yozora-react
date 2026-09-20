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
  protected _mounted = false
  protected _typesetVersion = 0

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
        /** Preserve a pending job's subtree so typesetClear can still locate its MathItems. */
        key: formula,
        ref: this._nodeRef,
        className,
        style,
      },
      getFormulaSource(formula, inline),
    )
  }

  // Render the math once the node is mounted.
  public override componentDidMount(): void {
    this._mounted = true
    this._requestTypeset()
  }

  public override getSnapshotBeforeUpdate(
    prevProps: Readonly<IMathJaxNodeWithoutContextProps>,
  ): null {
    if (
      !this._typesettingRef.current &&
      (this.props.formula !== prevProps.formula ||
        this.props.inline !== prevProps.inline ||
        this.props.MathJax !== prevProps.MathJax)
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
      this._requestTypeset()
    }
  }

  public override componentWillUnmount(): void {
    this._mounted = false
    this._typesetVersion += 1
    /** An active job retains its own node and engine until it settles and can safely clear them. */
    if (!this._typesettingRef.current) this._clear(this.props.MathJax)
  }

  protected _requestTypeset(): void {
    this._typesetVersion += 1
    if (this.state.error !== undefined) {
      /** The error view removes the node ref; retry only after the formula node is restored. */
      this.setState({ error: undefined }, () => this._typeset())
    } else {
      this._typeset()
    }
  }

  /**
   * Update math in the node
   */
  protected _typeset(): void | never {
    if (!this._mounted || this._typesettingRef.current) return

    const { MathJax, formula, inline } = this.props
    if (!MathJax) {
      throw new Error(
        "Could not find MathJax while attempting typeset! Probably the MathJax script hasn't been loaded or MathJaxContextType.Provider is not in the hierarchy",
      )
    }

    const node = this._nodeRef.current
    if (!node) return

    this._typesettingRef.current = true
    /** A superseded job may have overwritten the newer source with its own output. */
    node.textContent = getFormulaSource(formula, inline)
    void this._runTypeset(MathJax, node, this._typesetVersion)
  }

  protected async _runTypeset(
    mathJax: IMathJax,
    node: HTMLElement,
    version: number,
  ): Promise<void> {
    let error: string | undefined
    try {
      await mathJax.typesetPromise([node])
    } catch (reason: unknown) {
      const message = reason instanceof Error ? reason.message : String(reason)
      error = `Typesetting failed: ${message}`
    }

    const isCurrent =
      this._mounted && version === this._typesetVersion && node === this._nodeRef.current
    if (!isCurrent || error !== undefined) mathJax.typesetClear([node])
    this._onTypesetDone()
    if (!this._mounted) return

    if (!isCurrent) {
      /** Coalesce intermediate changes into a single job for the latest committed props. */
      this._typeset()
    } else if (error !== undefined) {
      this.setState({ error })
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

function getFormulaSource(formula: string, inline: boolean): string {
  return inline ? `$${formula}$` : `$$${formula.replace(/\n/g, ' ')}$$`
}
