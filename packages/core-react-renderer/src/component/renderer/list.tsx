import { css, cx } from '@emotion/css'
import type { List } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `list`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export class ListRenderer extends React.PureComponent<List> {
  public override render(): React.ReactElement {
    const { ordered, orderType, start, children } = this.props

    if (ordered) {
      return (
        <ol className={cls} type={orderType} start={start}>
          <NodesRenderer nodes={children} />
        </ol>
      )
    }

    return (
      <ul className={cls}>
        <NodesRenderer nodes={children} />
      </ul>
    )
  }
}

const cls = cx(
  'yozora-list',
  css({
    padding: 0,
    margin: '0 0 1em 2em',
    lineHeight: 2,
    '> :last-child': {
      marginBottom: 0,
    },
  }),
)
