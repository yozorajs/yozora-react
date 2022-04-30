import type { Break } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `Break`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#break
 * @see https://www.npmjs.com/package/@yozora/tokenizer-break
 */
export const BreakRenderer: INodeRenderer<Break> = () => {
  return <br className="yozora-break" />
}
