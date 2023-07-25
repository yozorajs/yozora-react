import { css, cx } from '@emotion/css'
import type { Blockquote } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `blockquote`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export class BlockquoteRenderer extends React.Component<Blockquote> {
  public override shouldComponentUpdate(nextProps: Readonly<Blockquote>): boolean {
    const props = this.props
    return props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const childNodes = this.props.children
    return (
      <blockquote className={cls}>
        <NodesRenderer nodes={childNodes} />
      </blockquote>
    )
  }
}

const cls = cx(
  'yozora-blockquote',
  css({
    boxSizing: 'border-box',
    padding: '0.625em 1em',
    borderLeft: `0.25em solid ${tokens.colorBorderBlockquote}`,
    margin: tokens.marginBlockNode,
    background: tokens.colorBgBlockquote,
    boxShadow: '0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1)',
    '> :last-child': {
      marginBottom: 0,
    },
  }),
)
