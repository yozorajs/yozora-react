import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface TextProps {
  /**
   * Literal text.
   */
  value: string
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
 * Render yozora `text`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export function Text(props: TextProps): React.ReactElement {
  const { value, className, style } = props
  return (
    <span className={cn('yozora-text', className)} style={style}>
      {value}
    </span>
  )
}

Text.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

Text.displayName = 'YozoraText'
export default Text
