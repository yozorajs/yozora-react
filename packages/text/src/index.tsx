import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface ITextProps {
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
 *
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const Text: React.FC<ITextProps> = props => {
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
