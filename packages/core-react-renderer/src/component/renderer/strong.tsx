import { css, cx } from '@emotion/css'
import type { Strong } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `strong`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#strong
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export class StrongRenderer extends React.PureComponent<Strong> {
  public override render(): React.ReactElement {
    return (
      <strong className={cls}>
        <NodesRenderer nodes={this.props.children} />
      </strong>
    )
  }
}

const cls = cx(
  'yozora-strong',
  css({
    fontWeight: 600,
  }),
)
