import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { getDescriptor } from './descriptor'
import { classes } from './style'

export interface IAdmonitionProps {
  /**
   * Admonition keyword.
   */
  keyword?: string
  /**
   * Admonition title
   */
  title?: React.ReactNode
  /**
   * Admonition contents.
   */
  children?: React.ReactNode
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Admonition title icon
   */
  icon?: React.ReactNode
}

/**
 * Render yozora `admonition`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#admonition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-admonition
 */
export class Admonition extends React.Component<IAdmonitionProps> {
  public static readonly displayName = 'Admonition'
  public static readonly propTypes = {
    keyword: PropTypes.string,
    title: PropTypes.node,
    icon: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  public override shouldComponentUpdate(nextProps: Readonly<IAdmonitionProps>): boolean {
    const props = this.props
    return (
      props.keyword !== nextProps.keyword ||
      props.title !== nextProps.title ||
      props.icon !== nextProps.icon ||
      props.className !== nextProps.className ||
      props.children !== nextProps.children
    )
  }

  public override render(): React.ReactElement {
    const { className, keyword, children } = this.props

    const hasCustomTitle = Array.isArray(this.props.title)
      ? this.props.title.length > 0
      : Boolean(this.props.title)
    const descriptor = getDescriptor(keyword)
    const icon = this.props.icon ?? descriptor.icon
    const title = hasCustomTitle ? this.props.title : descriptor.title

    const cls = cx(
      'yozora-admonition',
      classes.container,
      classes[descriptor.modifier as keyof typeof classes],
      className,
    )

    return (
      <div className={cls}>
        <div key="heading" className={classes.heading}>
          <span key="icon" className={classes.icon}>
            {icon}
          </span>
          <span key="title" className={classes.title}>
            {title}
          </span>
        </div>
        <div key="main" className={classes.body}>
          {children}
        </div>
      </div>
    )
  }
}
