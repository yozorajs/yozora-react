import type { FootnoteReference } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import React from 'react'

/**
 * Render yozora `footnoteReference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#footnotereference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 */
export const FootnoteReferenceRenderer: INodeRenderer<FootnoteReference> = props => {
  const { identifier, label } = props
  return (
    <sup id={'reference-' + identifier} className="yozora-footnote-reference">
      <a href={'#' + identifier} title={label}>
        [{label}]
      </a>
    </sup>
  )
}
