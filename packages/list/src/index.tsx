import PropTypes from 'prop-types'
import React from 'react'

export interface ListProps
  extends React.OlHTMLAttributes<HTMLOListElement | HTMLUListElement> {
  /**
   * List content.
   */
  children?: React.ReactNode
  /**
   * Flag used  to distinguish ordered and unordered list
   */
  ordered: boolean
  /**
   * Start number of ordered list
   */
  start?: number
  /**
   * Root css class of the component.
   * @default 'yozora-list'
   */
  className?: string
}

/**
 * Render yozora `list`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const List = React.forwardRef<
  HTMLOListElement | HTMLUListElement,
  ListProps
>(
  (props, forwardRef): React.ReactElement => {
    const {
      className = 'yozora-list',
      children,
      ordered,
      start,
      ...htmlProps
    } = props
    const L = ordered ? 'ol' : 'ul'

    return (
      <L {...htmlProps} ref={forwardRef as any} className={className}>
        {children}
      </L>
    )
  },
)

List.propTypes = {
  children: PropTypes.node,
  ordered: PropTypes.bool.isRequired,
  start: PropTypes.number,
  className: PropTypes.string,
}

List.displayName = 'YozoraList'
export default List
