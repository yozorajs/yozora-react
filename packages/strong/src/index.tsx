import PropTypes from 'prop-types'
import React from 'react'

export interface StrongProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Strong contents.
   */
  children: React.ReactNode
  /**
   * Root css class of the component.
   * @default 'yozora-strong'
   */
  className?: string
}

/**
 * Render yozora `strong`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-strong
 */
export const Strong = React.forwardRef<HTMLElement, StrongProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-strong', children, ...htmlProps } = props
    return (
      <strong {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </strong>
    )
  },
)

Strong.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Strong.displayName = 'YozoraStrong'
export default Strong
