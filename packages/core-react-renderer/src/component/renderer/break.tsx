import type { Break } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `Break`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#break
 * @see https://www.npmjs.com/package/@yozora/tokenizer-break
 */
export class BreakRenderer extends React.Component<Break> {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return <br className={cls} />
  }
}

const cls = 'yozora-break yozora-break__root'
