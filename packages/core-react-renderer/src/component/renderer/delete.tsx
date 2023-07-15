import { css, cx } from '@emotion/css'
import type { Delete } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `delete`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#delete
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export class DeleteRenderer extends React.PureComponent<Delete> {
  public override render(): React.ReactElement {
    return (
      <del className={cls}>
        <NodesRenderer nodes={this.props.children} />
      </del>
    )
  }
}

const cls = cx(
  'yozora-delete',
  css({
    marginRight: '4px',
    color: tokens.colorDelete,
    fontStyle: 'italic',
    textDecoration: 'line-through',
  }),
)
