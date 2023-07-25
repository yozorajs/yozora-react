import { css, cx } from '@emotion/css'
import type { Emphasis } from '@yozora/ast'
import { tokens } from '@yozora/core-react-constant'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `emphasis`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export class EmphasisRenderer extends React.Component<Emphasis> {
  public override shouldComponentUpdate(nextProps: Readonly<Emphasis>): boolean {
    const props = this.props
    return props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const childNodes = this.props.children
    return (
      <em className={cls}>
        <NodesRenderer nodes={childNodes} />
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
