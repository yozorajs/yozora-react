/* eslint-disable react/prop-types */
import type { LinkReference, Node } from '@yozora/ast'
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
  // eslint-disable-next-line react/no-children-prop
  return <LinkReferenceRendererInner url={url} title={title} children={props.children} />
}

class LinkReferenceRendererInner extends React.PureComponent<{
  url: string
  title: string | undefined
  children?: Node[]
}> {
  public override render(): React.ReactElement {
    const { url, title, children } = this.props
    return (
      <a
        className="yozora-link-reference yozora-link"
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
