import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface ListProps {
  /**
   * Flag used  to distinguish ordered and unordered list
   */
  ordered: boolean
  /**
   * Marker type of the list.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol#attr-type
   */
  orderType?: '1' | 'a' | 'A' | 'i' | 'I'
  /**
   * Start number of ordered list
   */
  start?: number
  /**
   * List content.
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
 * Render yozora `list`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const List: React.FC<ListProps> = props => {
  const { className, style, children, ordered, orderType, start } = props

  if (ordered) {
    return (
      <ol
        type={orderType}
        start={start}
        className={cn('yozora-list', className)}
        style={style}
      >
        {children}
      </ol>
    )
  }

  return (
    <ul className={cn('yozora-list', className)} style={style}>
      {children}
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  ordered: PropTypes.bool.isRequired,
  orderType: PropTypes.oneOf(['1', 'a', 'A', 'i', 'I']),
  start: PropTypes.number,
  style: PropTypes.object,
}

List.displayName = 'YozoraList'
export default List
