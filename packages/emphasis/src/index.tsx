import PropTypes from 'prop-types'
import React from 'react'

export interface EmphasisProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Emphasis contents.
   */
  children?: React.ReactNode
  /**
   * Root css class of the component.
   * @default 'yozora-emphasis'
   */
  className?: string
}

/**
 * Render yozora `emphasis`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const Emphasis = React.forwardRef<HTMLElement, EmphasisProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-emphasis', children, ...htmlProps } = props
    return (
      <em {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </em>
    )
  },
)

Emphasis.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

Emphasis.displayName = 'YozoraEmphasis'
export default Emphasis
