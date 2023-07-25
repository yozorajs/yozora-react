import type { Math } from '@yozora/ast'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export class MathRenderer extends React.Component<Math> {
  public override shouldComponentUpdate(nextProps: Readonly<Math>): boolean {
    const props = this.props
    return props.value !== nextProps.value
  }

  public override render(): React.ReactElement {
    return <MathJaxNode className="yozora-math" inline={false} formula={this.props.value} />
  }
}
