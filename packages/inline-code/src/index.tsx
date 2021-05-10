import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface InlineCodeProps {
  /**
   * Literal inline-code.
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
 * Render yozora `inline-code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export function InlineCode(props: InlineCodeProps): React.ReactElement {
  const { value, className, style } = props
  return (
    <code className={cn('yozora-inline-code', className)} style={style}>
      {value}
    </code>
  )
}

InlineCode.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

InlineCode.displayName = 'YozoraInlineCode'
export default InlineCode
