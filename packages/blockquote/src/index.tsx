import PropTypes from 'prop-types'
import React from 'react'

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLDivElement> {
  /**
   * Blockquote content.
   */
  children: React.ReactNode
  /**
   * Root css class of the component.
   * @default 'yozora-blockquote'
   */
  className?: string
}

/**
 * Render yozora `blockquote`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export const Blockquote = React.forwardRef<HTMLElement, BlockquoteProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-blockquote', children, ...htmlProps } = props
    return (
      <blockquote {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </blockquote>
    )
  },
)

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Blockquote.displayName = 'YozoraBlockquote'
export default Blockquote
