import type { InlineCode } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `inline-code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export class InlineCodeRenderer extends React.PureComponent<InlineCode> {
  public override render(): React.ReactElement {
    return <code className="yozora-inline-code">{this.props.value}</code>
  }
}
