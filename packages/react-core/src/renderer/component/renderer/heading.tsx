import type { Heading } from '@yozora/ast'
import React from 'react'
import { clsx } from '../../../util/clsx'
import { NodesRenderer } from '../NodesRenderer'

type IHeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface IProps extends Heading {
  linkIcon?: React.ReactNode
}

/**
 * Render `heading` content.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 */
export class HeadingRenderer extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props = this.props
    return (
      props.depth !== nextProps.depth ||
      props.identifier !== nextProps.identifier ||
      props.children !== nextProps.children ||
      props.linkIcon !== nextProps.linkIcon
    )
  }

  public override render(): React.ReactElement {
    const { depth, identifier, children, linkIcon = '¶' } = this.props

    const id = identifier == null ? undefined : encodeURIComponent(identifier)
    const H: IHeading = ('h' + depth) as IHeading

    const cls = clsx(
      'yozora-heading',
      !!identifier && 'yozora-heading--toc',
      classes.yozoraHeading,
      classes[H],
    )

    return (
      <H id={id} className={cls}>
        <p className={classes.yozoraHeadingContent}>
          <NodesRenderer nodes={children} />
        </p>
        {identifier && (
          <a className={classes.yozoraHeadingAnchor} href={'#' + id}>
            {linkIcon}
          </a>
        )}
      </H>
    )
  }
}

const classes = {
  yozoraHeading: 'yozora-heading__root',
  yozoraHeadingAnchor: 'yozora-heading__anchor',
  yozoraHeadingContent: 'yozora-heading__content',
  h1: 'yozora-heading__h1',
  h2: 'yozora-heading__h2',
  h3: 'yozora-heading__h3',
  h4: 'yozora-heading__h4',
  h5: 'yozora-heading__h5',
  h6: 'yozora-heading__h6',
}
