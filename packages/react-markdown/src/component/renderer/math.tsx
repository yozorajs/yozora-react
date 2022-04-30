import type { Math } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { MathJaxNode } from '@yozora/react-mathjax'
import React from 'react'

/**
 * Render yozora `math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export const MathRenderer: INodeRenderer<Math> = props => {
  return <MathJaxNode className="yozora-math" inline={false} formula={props.value} />
}
