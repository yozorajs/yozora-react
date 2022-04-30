import type { ThematicBreak } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `thematicBreak`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#thematicBreak
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export const ThematicBreakRenderer: INodeRenderer<ThematicBreak> = () => {
  return <hr className="yozora-thematic-break" />
}
