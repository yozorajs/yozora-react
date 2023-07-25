/* eslint-disable react/prop-types */
import type { LinkReference } from '@yozora/ast'
import React from 'react'
import { useNodeRendererContext } from '../../context/context'
import type { INodeRenderer } from '../../types'
import { LinkRendererInner } from './inner/LinkRendererInner'

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
    <LinkRendererInner
      url={url}
      title={title}
      childNodes={props.children}
      className="yozora-link-reference"
    />
  )
}
