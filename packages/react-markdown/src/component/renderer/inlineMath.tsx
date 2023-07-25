import type { InlineMath } from '@yozora/ast'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `inline-math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export class InlineMathRenderer extends React.Component<InlineMath> {
  public override shouldComponentUpdate(nextProps: Readonly<InlineMath>): boolean {
    const props = this.props
    return props.value !== nextProps.value
  }

  public override render(): React.ReactElement {
    return <MathJaxNode className="yozora-inline-math" inline={true} formula={this.props.value} />
  }
}
