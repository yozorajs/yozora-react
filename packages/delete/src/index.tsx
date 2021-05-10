import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface DeleteProps {
  /**
   * Delete contents.
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
 * Render yozora `delete`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export function Delete(props: DeleteProps): React.ReactElement {
  const { children, className, style } = props
  return (
    <del className={cn('yozora-delete', className)} style={style}>
      {children}
    </del>
  )
}

Delete.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

Delete.displayName = 'YozoraDelete'
export default Delete
