import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface IStrongProps {
  /**
   * Strong contents.
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
 * Render yozora `strong`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#strong
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const Strong: React.FC<IStrongProps> = props => {
  const { children, className, style } = props
  return (
    <strong className={cn('yozora-strong', className)} style={style}>
      {children}
    </strong>
  )
}

Strong.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

Strong.displayName = 'YozoraStrong'
export default Strong
