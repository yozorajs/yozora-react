import { css, cx } from '@emotion/css'
import type { Emphasis } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export class EmphasisRenderer extends React.PureComponent<Emphasis> {
  public override render(): React.ReactElement {
    return (
      <em className={cls}>
        <NodesRenderer nodes={this.props.children} />
      </em>
    )
  }
}

const cls = cx(
  'yozora-emphasis',
  css({
    fontStyle: 'italic',
    margin: tokens.marginEmphasis,
  }),
)
