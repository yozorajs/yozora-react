import type { Heading } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

interface IHeadingRendererProps extends Heading {
  linkIcon?: React.ReactNode
}

/**
 * Render `heading` content.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 */
export class HeadingRenderer extends React.PureComponent<IHeadingRendererProps> {
  public override render(): React.ReactElement {
    const { depth, identifier, children, linkIcon = '¶' } = this.props

    const id = identifier == null ? undefined : encodeURIComponent(identifier)
    const H: any = ('h' + depth) as keyof JSX.IntrinsicElements

    let className = 'yozora-heading'
    if (identifier) className += ' yozora-heading--toc'

    return (
      <H id={id} className={className}>
        <p className="yozora-heading__content">
          <NodesRenderer nodes={children} />
        </p>
        {identifier && (
          <a className="yozora-heading__anchor" href={'#' + id}>
            {linkIcon}
          </a>
        )}
      </H>
    )
  }
}
