import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface ListProps {
  /**
   * Flag used  to distinguish ordered and unordered list
   */
  ordered: boolean
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
export function List(props: ListProps): React.ReactElement {
  const { className, style, children, ordered, start } = props

  if (ordered) {
    return (
      <ol start={start} className={cn('yozora-list', className)} style={style}>
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
  start: PropTypes.number,
  style: PropTypes.object,
}

List.displayName = 'YozoraList'
export default List
