import type { Admonition } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { NodesRenderer } from '@yozora/core-react-renderer'
import AdmonitionRenderer0 from '@yozora/react-admonition'
import React from 'react'

/**
 * Render yozora `admonition`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#admonition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-admonition
 */
export const AdmonitionRenderer: INodeRenderer<Admonition> = props => {
  const title = props.title.length > 0 ? <NodesRenderer nodes={props.title} /> : undefined
  return (
    <AdmonitionRenderer0 keyword={props.keyword} title={title}>
      <NodesRenderer nodes={props.children} />
    </AdmonitionRenderer0>
  )
}
