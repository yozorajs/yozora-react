import type { Admonition } from '@yozora/ast'
import { NodesRenderer } from '@yozora/core-react-renderer'
import AdmonitionRenderer0 from '@yozora/react-admonition'
import React from 'react'

/**
 * Render yozora `admonition`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#admonition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-admonition
 * @see https://www.npmjs.com/package/@yozora/react-admonition
 */
export class AdmonitionRenderer extends React.Component<Admonition> {
  public override shouldComponentUpdate(nextProps: Readonly<Admonition>): boolean {
    const props = this.props
    return (
      props.keyword !== nextProps.keyword ||
      props.title !== nextProps.title ||
      props.children !== nextProps.children
    )
  }

  public override render(): React.ReactElement {
    const { keyword, title: title0, children } = this.props
    const title = title0.length > 0 ? <NodesRenderer nodes={title0} /> : undefined

    return (
      <AdmonitionRenderer0 keyword={keyword} title={title}>
        <NodesRenderer nodes={children} />
      </AdmonitionRenderer0>
    )
  }
}
