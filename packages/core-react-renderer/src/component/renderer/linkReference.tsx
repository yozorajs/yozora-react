import type { LinkReference } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `link-reference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#linkReference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link-reference
 */
export const LinkReferenceRenderer: INodeRenderer<LinkReference> = props => {
  const { definitionMap } = useNodeRendererContext()
  const definition = definitionMap[props.identifier]
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
      <NodesRenderer nodes={props.children} />
    </a>
  )
}
