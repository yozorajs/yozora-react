import type { InlineCode } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `inline-code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export const InlineCodeRenderer: INodeRenderer<InlineCode> = props => {
  return <code className="yozora-inline-code">{props.value}</code>
}
