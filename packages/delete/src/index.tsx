import PropTypes from 'prop-types'
import React from 'react'

export interface DeleteProps extends React.DelHTMLAttributes<HTMLElement> {
  /**
   * Delete contents.
   */
  children?: React.ReactNode
  /**
   * Root css class of the component.
   * @default 'yozora-delete'
   */
  className?: string
}

/**
 * Render yozora `delete`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export const Delete = React.forwardRef<HTMLElement, DeleteProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-delete', children, ...htmlProps } = props
    return (
      <del {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </del>
    )
  },
)

Delete.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

Delete.displayName = 'YozoraDelete'
export default Delete
