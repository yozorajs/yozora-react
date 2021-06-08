/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import React from 'react'
import { MathJaxContext } from './Context'
import type { MathJax, MathJaxContextValue } from './types'
import { processMathJax } from './util'

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

export interface MathJaxNodeWithContextProps extends MathJaxNodeProps {
  /**
   * Type of the formula string.
   */
  language: 'tex' | 'asciimath'
  /**
   * MathJax instance.
   */
  MathJax: MathJax
}

export class MathJaxNodeWithContext extends React.Component<MathJaxNodeWithContextProps> {
  protected readonly nodeRef = React.createRef<HTMLElement>()
  protected scriptNode: HTMLScriptElement | null = null

  public static propTypes = {
    language: PropTypes.oneOf(['tex', 'asciimath']).isRequired,
    MathJax: PropTypes.object.isRequired,
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

    return <T ref={this.nodeRef as any} className={className} style={style} />
  }

  /**
   * Render the math once the node is mounted.
   */
  public componentDidMount(): void {
    this.typeset(false)
  }

  public componentDidUpdate(prevProps: MathJaxNodeProps): void {
    const forceUpdate = this.shouldComponentUpdate(prevProps)
    this.typeset(forceUpdate)
  }

  public shouldComponentUpdate(nextProps: MathJaxNodeProps): boolean {
    const props = this.props
    return (
      nextProps.formula !== props.formula || nextProps.inline !== props.inline
    )
  }

  public componentWillUnmount(): void {
    this.clear()
  }

  /**
   * Clear the jax
   */
  protected clear(): void {
    const { MathJax } = this.props
    if (MathJax == null || this.scriptNode == null) return

    const jax = MathJax.Hub.getJaxFor(this.scriptNode)
    if (jax != null) jax.Remove()
  }

  /**
   * Update math in the node
   * @param forceUpdate
   */
  protected typeset(forceUpdate: boolean): void | never {
    const { MathJax } = this.props
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
      if (jax != null) jax.Text(formula, onRender)
      else {
        this.setFormula(formula)
        processMathJax(MathJax, this.scriptNode!, onRender)
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

    const { language, inline } = this.props
    if (this.scriptNode == null) {
      const scriptNode = document.createElement('script')
      scriptNode.type = `math/${language}; ${inline ? '' : 'mode=display'}`
      current.appendChild(scriptNode)
      this.scriptNode = scriptNode
    }
    this.scriptNode.textContent = formula
  }
}

export class MathJaxNode extends React.PureComponent<MathJaxNodeProps> {
  public render(): React.ReactElement {
    return (
      <MathJaxContext.Consumer>
        {({ MathJax, language }: MathJaxContextValue) => {
          if (!MathJax) {
            const { formula, inline, ...rest } = this.props
            const T = inline ? 'span' : 'div'
            return <T {...rest}>{formula}</T>
          }

          return (
            <MathJaxNodeWithContext
              {...this.props}
              MathJax={MathJax}
              language={language}
            />
          )
        }}
      </MathJaxContext.Consumer>
    )
  }
}
