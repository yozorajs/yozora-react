import type { ThematicBreak } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `thematicBreak`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#thematicBreak
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export class ThematicBreakRenderer extends React.Component<ThematicBreak> {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return <hr className={cls} />
  }
}

const cls = 'yozora-thematic-break yozora-thematic-break__root'
