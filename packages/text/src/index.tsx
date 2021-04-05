import PropTypes from 'prop-types'
import React from 'react'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Literal text.
   */
  value: string
  /**
   * Root css class of the component.
   * @default 'yozora-text'
   */
  className?: string
}

/**
 * Render yozora `text`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      className = 'yozora-text',
      // eslint-disable-next-line react/prop-types
      children: _, // children is not allowed.
      value,
      ...htmlProps
    } = props
    return (
      <span {...htmlProps} ref={forwardRef} className={className}>
        {value}
      </span>
    )
  },
)

Text.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Text.displayName = 'YozoraText'
export default Text
