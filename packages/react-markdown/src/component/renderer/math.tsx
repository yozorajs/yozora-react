import type { Math } from '@yozora/ast'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export class MathRenderer extends React.PureComponent<Math> {
  public override render(): React.ReactElement {
    return <MathJaxNode className="yozora-math" inline={false} formula={this.props.value} />
  }
}
