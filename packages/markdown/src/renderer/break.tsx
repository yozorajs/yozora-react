import type { Break } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `Break`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#break
 * @see https://www.npmjs.com/package/@yozora/tokenizer-break
 */
export const BreakRenderer: React.FC<Break> = () => {
  return <br className="yozora-break" />
}
