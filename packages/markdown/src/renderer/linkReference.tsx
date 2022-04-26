import type { LinkReference } from '@yozora/ast'
import React from 'react'
import { YozoraMarkdownContextType } from '../context/context'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `link-reference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#linkReference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link-reference
 */
export const LinkReferenceRenderer: React.FC<LinkReference> = props => {
  const { getDefinition } = React.useContext(YozoraMarkdownContextType)
  const definition = getDefinition(props.identifier)
  const url: string = definition?.url ?? ''
  const title: string | undefined = definition?.title

  return (
    <a
      className="yozora-link-reference yozora-link"
      href={url}
      title={title}
      rel="noopener, noreferrer"
      target="_blank"
    >
      <YozoraNodesRenderer nodes={props.children} />
    </a>
  )
}
