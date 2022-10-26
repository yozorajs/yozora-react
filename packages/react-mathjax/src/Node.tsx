import React from 'react'
import { MathJax } from './custom/MathJax'

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
   * @default false
   * @see https://github.com/fast-reflexes/better-react-mathjax#dynamic-boolean--undefined
   */
  dynamic?: boolean
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

export class MathJaxNode extends React.PureComponent<IMathJaxNodeProps> {
  public override render(): React.ReactElement {
    const { formula, inline, dynamic, className, style, onRender } = this.props
    const children = inline ? '$' + formula + '$' : '$$' + formula + '$$'
    return (
      <MathJax
        inline={inline}
        dynamic={dynamic}
        text={formula}
        className={className}
        style={style}
        onTypeset={onRender}
      >
        {children}
      </MathJax>
    )
  }
}
