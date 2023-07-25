import { css, cx } from '@emotion/css'
import type { ThematicBreak } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
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

const cls = cx(
  'yozora-thematic-break',
  css({
    boxSizing: 'content-box',
    display: 'block',
    height: 0,
    width: '100%',
    padding: 0,
    border: 0,
    borderBottom: `1px solid ${tokens.colorBorderThematicBreak}`,
    outline: 0,
    margin: tokens.marginThematicBreak,
  }),
)
