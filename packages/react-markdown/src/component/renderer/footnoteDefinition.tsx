import type { FootnoteDefinition } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { NodesRenderer } from '@yozora/core-react-renderer'
import React from 'react'

/**
 * Render footnote definition
 *
 * @see https://www.npmjs.com/package/@yozora/ast#footnote
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteReference
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteDefinition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 */
export const FootnoteDefinitionRenderer: INodeRenderer<FootnoteDefinition> = props => {
  const { identifier, label = identifier, children } = props
  return (
    <div className="yozora-footnote-definition">
      <p className="yozora-footnote-definition__title yozora-paragraph">
        <a href={'#reference-' + identifier}>&uarr;</a>
        <span>&nbsp;[{label}]:&nbsp;</span>
      </p>
      <div className="yozora-footnote-definition__content">
        <NodesRenderer nodes={children} />
      </div>
    </div>
  )
}
