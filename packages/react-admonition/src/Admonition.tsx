import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import {
  YozoraAdmonitionCautionIcon,
  YozoraAdmonitionDangerIcon,
  YozoraAdmonitionInfoIcon,
  YozoraAdmonitionNoteIcon,
  YozoraAdmonitionTipIcon,
} from './icons'
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
   * Root css style.
   */
  style?: React.CSSProperties
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
export const Admonition: React.FC<IAdmonitionProps> = props => {
  const { className, style, keyword = 'default', children } = props

  let { icon, title } = props
  const hasCustomTitle = Boolean(title) && (!Array.isArray(title) || title.length > 0)

  let modifier = keyword.trim().toLowerCase()
  switch (modifier) {
    case '':
    case 'default':
    case 'note':
      modifier = 'note'
      if (icon === undefined) icon = <YozoraAdmonitionNoteIcon />
      if (!hasCustomTitle) title = 'NOTE'
      break
    case 'important':
    case 'info':
      modifier = 'info'
      if (icon === undefined) icon = <YozoraAdmonitionInfoIcon />
      if (!hasCustomTitle) title = 'INFO'
      break
    case 'success':
    case 'tip':
      modifier = 'tip'
      if (icon === undefined) icon = <YozoraAdmonitionTipIcon />
      if (!hasCustomTitle) title = 'TIP'
      break
    case 'warning':
    case 'caution':
      modifier = 'caution'
      if (icon === undefined) icon = <YozoraAdmonitionCautionIcon />
      if (!hasCustomTitle) title = 'CAUTION'
      break
    case 'error':
    case 'danger':
      modifier = 'danger'
      if (icon === undefined) icon = <YozoraAdmonitionDangerIcon />
      if (!hasCustomTitle) title = 'DANGER'
      break
  }

  return (
    <div
      className={cx('yozora-admonition', classes.container, className)}
      data-admonition-keyword={modifier}
      style={style}
    >
      <div key="heading" className={classes.heading}>
        <span key="icon" className={classes.icon}>
          {icon}
        </span>
        <span key="title" className={classes.title}>
          {title}
        </span>
      </div>
      <div key="main">{children}</div>
    </div>
  )
}

Admonition.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  keyword: PropTypes.string,
  icon: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
}
Admonition.displayName = 'YozoraAdmonition'
