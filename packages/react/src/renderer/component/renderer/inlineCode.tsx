import type { InlineCode } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `inline-code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export class InlineCodeRenderer extends React.Component<InlineCode> {
  public override shouldComponentUpdate(nextProps: Readonly<InlineCode>): boolean {
    const props = this.props
    return props.value !== nextProps.value
  }

  public override render(): React.ReactElement {
    return <code className={cls}>{this.props.value}</code>
  }
}

const cls = 'yozora-inline-code yozora-inline-code__root'
