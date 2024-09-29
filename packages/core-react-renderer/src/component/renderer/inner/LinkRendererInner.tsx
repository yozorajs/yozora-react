import { css } from '@emotion/css'
import type { Node } from '@yozora/ast'
import { tokens } from '@yozora/core-react-constant'
import React from 'react'
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
        className={`${className} ${cls}`}
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

const cls = css({
  padding: '0.2rem 0',
  color: tokens.colorLink,
  textDecoration: 'none',
  background:
    'linear-gradient(90deg, hsla(358deg, 100%, 62%, 0.8), hsla(048deg, 100%, 50%, 0.8), hsla(196deg, 100%, 53%, 0.8))',
  backgroundSize: '0 3px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 100%',
  transition: 'all 0.3s ease-in-out',
  '&:active': {
    color: tokens.colorLinkActive,
  },
  '&&:hover': {
    color: tokens.colorLinkHover,
    backgroundSize: '100% 3px',
    backgroundPositionX: 0,
  },
  '&:visited': {
    color: tokens.colorLinkVisited,
  },
})
