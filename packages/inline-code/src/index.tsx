import PropTypes from 'prop-types'
import React from 'react'

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Literal inline-code.
   */
  value: string
  /**
   * Root css class of the component.
   * @default 'yozora-inline-code'
   */
  className?: string
}

/**
 * Render yozora `inline-code`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      className = 'yozora-inline-code',
      // eslint-disable-next-line react/prop-types
      children: _, // children is not allowed.
      value,
      ...htmlProps
    } = props
    return (
      <code {...htmlProps} ref={forwardRef} className={className}>
        {value}
      </code>
    )
  },
)

InlineCode.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
}

InlineCode.displayName = 'YozoraInlineCode'
export default InlineCode
