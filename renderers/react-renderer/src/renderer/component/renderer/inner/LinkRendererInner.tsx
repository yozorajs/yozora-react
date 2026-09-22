import type { Node } from '@yozora/ast'
import React from 'react'
import { clsx } from '../../../../util/clsx'
import { NodesRenderer } from '../../NodesRenderer'

interface IProps {
  url: string
  title: string | undefined
  childNodes: Node[] | undefined
  className: string
}

export class LinkRendererInner extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props = this.props
    return (
      props.url !== nextProps.url ||
      props.title !== nextProps.title ||
      props.childNodes !== nextProps.childNodes ||
      props.className !== nextProps.className
    )
  }

  public override render(): React.ReactElement {
    const { url, title, childNodes, className } = this.props
    return (
      <a
        className={clsx(className, cls)}
        href={url}
        title={title}
        rel="noopener, noreferrer"
        target="_blank"
      >
        <NodesRenderer nodes={childNodes} />
      </a>
    )
  }
}

const cls = 'yozora-link__root'
