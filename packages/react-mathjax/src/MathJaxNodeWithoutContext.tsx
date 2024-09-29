import { isEqual } from '@guanghechen/equal'
import PropTypes from 'prop-types'
import React from 'react'
import { MathError } from './MathError'
import type { IMathJax3, TexLang } from './types'

interface IProps {
  MathJax3: IMathJax3
  language: TexLang
  formula: string
  inline: boolean
  className?: string
  style?: React.CSSProperties
}

interface IState {
  error: string | undefined
}

export class MathJaxNodeWithoutContext extends React.Component<IProps, IState> {
  public static readonly displayName = 'MathJaxNodeWithoutContext'
  public static readonly propTypes = {
    MathJax3: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    formula: PropTypes.node.isRequired,
    inline: PropTypes.bool.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  protected readonly _nodeRef: React.RefObject<HTMLDivElement>
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
      props.MathJax3 !== nextProps.MathJax3 ||
      props.language !== nextProps.language ||
      props.formula !== nextProps.formula ||
      props.inline !== nextProps.inline ||
      props.className !== nextProps.className ||
      !isEqual(props.style, nextProps.style)
    )
  }

  public override render(): React.ReactElement {
    const { formula, inline, className, style } = this.props
    const { error } = this.state

    if (typeof error === 'string') {
      return (
        <MathError
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
      props.MathJax3 !== prevProps.MathJax3
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
    const { MathJax3 } = this.props
    if (!MathJax3) {
      throw new Error(
        "Could not find MathJax3 while attempting typeset! Probably MathJax3 script hasn't been loaded or MathJaxContextType.Provider is not in the hierarchy",
      )
    }

    const node = this._nodeRef.current
    if (node) {
      if (!this._typesettingRef.current) {
        this._typesettingRef.current = true
        void MathJax3.startup.promise
          .then(() => {
            MathJax3.typesetClear([node])
            return MathJax3.typesetPromise([[node]])
          })
          .then(() => {
            this.setState({ error: undefined })
            this._onTypesetDone()
          })
          .catch(err => {
            console.log('err:', err)
            this.setState({ error: `Typesetting failed: ${err.message ?? err.toString()}` })
            this._onTypesetDone()
          })
      }
    }
  }

  protected _onTypesetDone(): void {
    this._typesettingRef.current = false
  }
}
