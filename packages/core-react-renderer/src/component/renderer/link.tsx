import { css, cx } from '@emotion/css'
import type { Link } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `link`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink
 * @see https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
 */
export class LinkRenderer extends React.PureComponent<Link> {
  public override render(): React.ReactElement {
    const { url, title, children } = this.props
    return (
      <a className={cls} href={url} title={title} rel="noopener, noreferrer" target="_blank">
        <NodesRenderer nodes={children} />
      </a>
    )
  }
}

const cls = cx(
  'yozora-link',
  css({
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
  }),
)
