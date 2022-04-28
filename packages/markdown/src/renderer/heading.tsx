import type { Heading } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render `heading` content.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 */
export const HeadingRenderer: React.FC<Heading & { linkIcon?: React.ReactNode }> = props => {
  const { depth, identifier, linkIcon = '¶' } = props

  const id = identifier == null ? undefined : encodeURIComponent(identifier)
  const H: any = ('h' + depth) as keyof JSX.IntrinsicElements

  let className = 'yozora-heading'
  if (identifier) className += ' yozora-heading--toc'

  return (
    <H id={id} className={className}>
      <p className="yozora-heading__content">
        <YozoraNodesRenderer nodes={props.children} />
      </p>
      {identifier && (
        <a className="yozora-heading__anchor" href={'#' + id}>
          {linkIcon}
        </a>
      )}
    </H>
  )
}
