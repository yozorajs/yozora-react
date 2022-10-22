/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import React from 'react'
import { MathJaxContextType } from './Context'
import type { IMathJax } from './types'
import { MathJaxLanguage } from './types'
import { cancelProcessMathJax, processMathJax } from './util/process'

export interface IMathJaxNodeProps {
  /**
   * The literal formula string.
   */
  formula: string
  /**
   * Whether to render the formulas in inline mode.
   * @default false
   */
  inline?: boolean
  /**
   * CSS class name.
   */
  className?: string
  /**
   * CSS style properties
   */
  style?: React.CSSProperties
  /**
   * On mathjax rendering.
   */
  onRender?(): void
}

export const MathJaxNode: React.FC<IMathJaxNodeProps> = props => {
  const { inline, className, style, onRender } = props
  const { MathJax, language } = React.useContext(MathJaxContextType)
  const formula = props.formula.trim()

  if (MathJax) {
    return (
      <MathJaxNodeWithContext
        MathJax={MathJax}
        language={language}
        formula={formula}
        inline={inline}
        className={className}
        style={style}
        onRender={onRender}
      />
    )
  }

  // Fallback, show source formula.
  return inline ? (
    <span className={className} style={style}>
      ${formula}$
    </span>
  ) : (
    <div className={className} style={style}>
      $${formula}$$
    </div>
  )
}

export interface IMathJaxNodeWithContextProps extends IMathJaxNodeProps {
  MathJax: IMathJax
  language: string
}

export class MathJaxNodeWithContext extends React.Component<IMathJaxNodeWithContextProps> {
  protected readonly _nodeRef = React.createRef<HTMLDivElement>()
  protected _formulaNode: HTMLScriptElement | null = null

  public static propTypes = {
    MathJax: PropTypes.object.isRequired,
    language: PropTypes.oneOf([MathJaxLanguage.TEX, MathJaxLanguage.ASCIIMATH]).isRequired,
    formula: PropTypes.node.isRequired,
    inline: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onRender: PropTypes.func,
  }

  public static defaultProps = {
    inline: false,
  }

  public override render(): React.ReactElement {
    const { inline, className, style } = this.props
    return React.createElement(inline ? 'span' : 'div', { ref: this._nodeRef, className, style })
  }

  // Render the math once the node is mounted.
  public override componentDidMount(): void {
    this._typeset(false)
  }

  public override componentDidUpdate(prevProps: IMathJaxNodeWithContextProps): void {
    this._typeset(this.shouldComponentUpdate(prevProps))
  }

  public override componentWillUnmount(): void {
    this._clear()
  }

  public override shouldComponentUpdate(nextProps: IMathJaxNodeWithContextProps): boolean {
    const props = this.props
    return (
      nextProps.MathJax !== props.MathJax ||
      nextProps.language !== props.language ||
      nextProps.formula !== props.formula ||
      nextProps.inline !== props.inline ||
      nextProps.className !== props.className ||
      nextProps.style !== props.style
    )
  }

  // Clear the jax
  protected _clear(): void {
    const { MathJax } = this.props
    if (MathJax && this._formulaNode) {
      cancelProcessMathJax(MathJax, this._formulaNode)
    }
  }

  /**
   * Update math in the node
   * @param isForceUpdate
   */
  protected _typeset(isForceUpdate: boolean): void | never {
    const { MathJax, formula, onRender } = this.props
    if (!MathJax) {
      throw new Error(
        `Could not find MathJax while attempting typeset! Probably MathJax script hasn't been loaded or MathJaxContextType.Provider is not in the hierarchy`,
      )
    }

    if (isForceUpdate) {
      this._clear()
    }

    if (isForceUpdate || !this._formulaNode) {
      this._setFormula(formula)
      processMathJax(MathJax, this._formulaNode!, onRender)
      return
    }

    MathJax.Hub.Queue(() => {
      const jax = MathJax.Hub.getJaxFor(this._formulaNode!)
      if (jax?.Text) jax.Text(formula, onRender)
      else {
        this._setFormula(formula)
        processMathJax(MathJax, this._formulaNode!, onRender)
      }
    })
  }

  /**
   * Create / Update a script tag for rendering formula.
   * @param formula
   */
  protected _setFormula(formula: string): void {
    const current = this._nodeRef.current
    if (current == null) return

    const { language, inline } = this.props
    if (!this._formulaNode) {
      this._formulaNode = document.createElement('script')
      this._formulaNode.type = `math/${language}; ${inline ? '' : 'mode=display'}`
    }

    if (!current.contains(this._formulaNode)) {
      current.appendChild(this._formulaNode)
    }

    this._formulaNode.textContent = formula
  }
}
