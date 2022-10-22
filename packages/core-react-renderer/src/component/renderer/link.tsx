import type { Link } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export class LinkRenderer extends React.PureComponent<Link> {
  public override render(): React.ReactElement {
    const { url, title, children } = this.props
    return (
      <a
        className="yozora-link"
        href={url}
        title={title}
        rel="noopener, noreferrer"
        target="_blank"
      >
        <NodesRenderer nodes={children} />
      </a>
    )
  }
}
