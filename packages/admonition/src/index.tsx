import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface AdmonitionProps {
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
}

/**
 * Render yozora `admonition`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#admonition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-admonition
 */
export function Admonition(props: AdmonitionProps): React.ReactElement {
  const { className, style, keyword = 'default', title, children } = props

  let modifier = keyword.trim().toLowerCase()
  switch (modifier) {
    case 'note':
      modifier = 'default'
      break
    case 'important':
      modifier = 'info'
      break
    case 'tip':
      modifier = 'success'
      break
    case 'caution':
      modifier = 'warning'
      break
    case 'error':
      modifier = 'danger'
      break
  }

  return (
    <div
      className={cn(
        'yozora-admonition',
        'yozora-admonition--' + modifier,
        className,
      )}
      style={style}
    >
      <div key="heading" className="yozora-admonition__heading">
        <h5>{title}</h5>
      </div>
      <div key="body" className="yozora-admonition__body">
        {children}
      </div>
    </div>
  )
}

Admonition.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  keyword: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.node,
}

Admonition.displayName = 'YozoraAdmonition'
export default Admonition
