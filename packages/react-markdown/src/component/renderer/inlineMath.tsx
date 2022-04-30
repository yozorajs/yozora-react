import type { InlineMath } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `inline-math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export const InlineMathRenderer: INodeRenderer<InlineMath> = props => {
  return <MathJaxNode className="yozora-inline-math" inline={true} formula={props.value} />
}
