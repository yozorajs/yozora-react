import type { InlineMath } from '@yozora/ast'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `inline-math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export const InlineMathRenderer: React.FC<InlineMath> = props => {
  return <MathJaxNode className="yozora-inline-math" inline={true} formula={props.value} />
}
