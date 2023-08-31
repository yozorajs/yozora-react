import { css, cx } from '@emotion/css'
import type { Delete, Node } from '@yozora/ast'
import { tokens } from '@yozora/core-react-constant'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `delete`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#delete
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export class DeleteRenderer extends React.Component<Delete> {
  public override shouldComponentUpdate(nextProps: Readonly<Delete>): boolean {
    const props = this.props
    return props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const childNodes: Node[] = this.props.children
    return (
      <del className={cls}>
        <NodesRenderer nodes={childNodes} />
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
