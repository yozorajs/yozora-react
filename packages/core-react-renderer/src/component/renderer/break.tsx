import { css, cx } from '@emotion/css'
import type { Break } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `Break`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#break
 * @see https://www.npmjs.com/package/@yozora/tokenizer-break
 */
export class BreakRenderer extends React.PureComponent<Break> {
  public override render(): React.ReactElement {
    return <br className={cls} />
  }
}

const cls = cx(
  'yozora-break',
  css({
    boxSizing: 'border-box',
  }),
)
