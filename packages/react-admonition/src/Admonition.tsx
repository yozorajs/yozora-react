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
export class Admonition extends React.PureComponent<IAdmonitionProps> {
  public static readonly displayName = 'YozoraAdmonition'
  public static readonly propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    keyword: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.node,
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
        <h5 key="heading" className={classes.heading}>
          <span key="icon" className={classes.icon}>
            {icon}
          </span>
          <span key="title" className={classes.title}>
            {title}
          </span>
        </h5>
        <div key="main" className={classes.body}>
          {children}
        </div>
      </div>
    )
  }
}
