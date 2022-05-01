import { css, cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import {
  YozoraAdmonitionCautionIcon,
  YozoraAdmonitionDangerIcon,
  YozoraAdmonitionInfoIcon,
  YozoraAdmonitionNoteIcon,
  YozoraAdmonitionTipIcon,
} from './icons'

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
      <h5 key="heading" className="yozora-admonition__heading">
        <span key="icon" className="yozora-admonition__heading-icon">
          {icon}
        </span>
        <span key="title" className="yozora-admonition__heading-title">
          {title}
        </span>
      </h5>
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

const classes = {
  container: css({
    padding: '1em',
    borderLeft: 'var(--yozora-admonition-border-width, 5px) solid transparent',
    borderRadius: '6px',
    margin: '0 0 1.25em 0',
    boxShadow: '0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1)',
    '.yozora-admonition__heading': {
      display: 'flex',
      alignItems: 'flex-start',
      lineHeight: 1.6,
      fontSize: '0.857rem',
      margin: '0 0 8px 0',
      verticalAlign: 'middle',
      letterSpacing: '1px',
      textRendering: 'optimizeLegibility',
      textSizeAdjust: '100%',
      textTransform: 'none',
      overflowWrap: 'break-word',
      fontFamily: `system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif`,
    },
    '.yozora-admonition__heading-icon': {
      marginRight: '0.5rem',
      '> svg:first-child path': {
        fill: 'currentColor',
      },
    },
    '.yozora-admonition__heading-title': {
      display: 'block',
    },
    '&&[data-admonition-keyword="note"]': {
      borderColor: 'var(--yozora-admonition--note__border-color, #d4d5d8)',
      backgroundColor: 'var(--yozora-admonition--note__bg, #fdfdfe)',
      '.yozora-admonition__heading': {
        color: 'var(--yozora-admonition--note__border-color, #d4d5d8)',
      },
    },
    '&&[data-admonition-keyword="info"]': {
      borderColor: 'var(--yozora-admonition--info__border-color, #4cb3d4)',
      backgroundColor: 'var(--yozora-admonition--info__bg, #eef9fd)',
      '.yozora-admonition__heading': {
        color: 'var(--yozora-admonition--info__border-color, #4cb3d4)',
      },
    },
    '&&[data-admonition-keyword="tip"]': {
      borderColor: 'var(--yozora-admonition--tip__border-color, #009400)',
      backgroundColor: 'var(--yozora-admonition--tip__bg, #e6f6e6)',
      '.yozora-admonition__heading': {
        color: 'var(--yozora-admonition--tip__border-color, #009400)',
      },
    },
    '&&[data-admonition-keyword="caution"]': {
      borderColor: 'var(--yozora-admonition--caution__border-color, #e6a700)',
      backgroundColor: 'var(--yozora-admonition--caution__bg, #fff8e6)',
      '.yozora-admonition__heading': {
        color: 'var(--yozora-admonition--caution__border-color, #e6a700)',
      },
    },
    '&&[data-admonition-keyword="danger"]': {
      borderColor: 'var(--yozora-admonition--danger__border-color, #e13238)',
      backgroundColor: 'var(--yozora-admonition--danger__bg, #ffebec)',
      '.yozora-admonition__heading': {
        color: 'var(--yozora-admonition--danger__border-color, #e13238)',
      },
    },
  }),
}
