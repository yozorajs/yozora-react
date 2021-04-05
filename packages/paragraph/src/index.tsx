import PropTypes from 'prop-types'
import React from 'react'

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Paragraph content.
   */
  children: React.ReactNode
  /**
   * Root css class of the component.
   * @default 'yozora-paragraph'
   */
  className?: string
}

/**
 * Render yozora `paragraph`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, forwardRef): React.ReactElement => {
    const { className = 'yozora-paragraph', children, ...htmlProps } = props
    return (
      <p {...htmlProps} ref={forwardRef} className={className}>
        {children}
      </p>
    )
  },
)

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Paragraph.displayName = 'YozoraParagraph'
export default Paragraph
