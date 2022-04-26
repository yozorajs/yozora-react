import type { ThematicBreak } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `thematicBreak`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#thematicBreak
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export const ThematicBreakRenderer: React.FC<ThematicBreak> = () => {
  return <hr className="yozora-thematic-break" />
}
