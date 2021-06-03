/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import React from 'react'
import { processMathJax } from './util'
import type { MathJaxContextData } from './types'

export interface MathJaxNodeProps {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MathJaxNodeState {}

export class MathJaxNode extends React.Component<
  MathJaxNodeProps,
  MathJaxNodeState,
  MathJaxContextData
> {
  protected readonly nodeRef = React.createRef<HTMLElement>()
  protected scriptNode: HTMLScriptElement | null = null

  public static contextTypes = {
    language: PropTypes.oneOf(['tex', 'asciimath']),
    MathJax: PropTypes.object,
  }

  public static propTypes = {
    formula: PropTypes.node.isRequired,
    inline: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  public static defaultProps = {
    inline: false,
  }

  public render(): React.ReactElement {
    const { className, style, inline } = this.props
    const T = inline ? 'span' : 'div'

    return (
      <T
        ref={this.nodeRef as any}
        className={className}
        style={style}
      />
    )
  }

  /**
   * Render the math once the node is mounted.
   */
  public override componentDidMount(): void {
    this.typeset(false)
  }

  public override componentDidUpdate(prevProps: MathJaxNodeProps): void {
    const forceUpdate = this.shouldComponentUpdate(prevProps)
    this.typeset(forceUpdate)
  }

  public override shouldComponentUpdate(nextProps: MathJaxNodeProps): boolean {
    const props = this.props
    return (
      nextProps.formula !== props.formula || nextProps.inline !== props.inline
    )
  }

  public override componentWillUnmount(): void {
    this.clear()
  }

  /**
   * Clear the jax
   */
  protected clear(): void {
    const { MathJax } = this.context
    if (MathJax == null || this.scriptNode == null) return

    const jax = MathJax.Hub.getJaxFor(this.scriptNode)
    if (jax != null) jax.Remove()
  }

  /**
   * Update math in the node
   * @param forceUpdate
   */
  protected typeset(forceUpdate: boolean): void | never {
    const { MathJax } = this.context
    if (MathJax == null) {
      console.warn(`Cannot find MathJax instance!`)
      return
    }

    if (forceUpdate) this.clear()

    const { formula, onRender } = this.props
    if (forceUpdate || this.scriptNode == null) {
      this.setFormula(formula)
      processMathJax(MathJax, this.scriptNode!, onRender)
      return
    }

    MathJax.Hub.Queue(() => {
      const jax = MathJax.Hub.getJaxFor(this.scriptNode!)
      if (jax != null) jax.Text(formula, onRender);
      else {
        this.setFormula(formula);
        processMathJax(MathJax, this.scriptNode!, onRender);
      }
    })
  }

  /**
   * Create / Update a script tag for rendering formula.
   * @param formula
   */
  protected setFormula(formula: string): void {
    const current = this.nodeRef.current
    if (current == null) return

    const { inline } = this.props
    const { language } = this.context

    if (this.scriptNode == null) {
      const scriptNode = document.createElement('script')
      scriptNode.type = `math/${language}; ${inline ? '' : 'mode=display'}`
      current.appendChild(scriptNode)
      this.scriptNode = scriptNode
    }
    this.scriptNode.textContent = formula
  }
}
