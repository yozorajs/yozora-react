import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import MathJax from 'react-mathjax'

export interface InlineMathProps {
  /**
   * Literal inline-math.
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
 * Render yozora `inline-math`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export function InlineMath(props: InlineMathProps): React.ReactElement {
  const { value, className, style } = props
  return (
    <span className={cn('yozora-inline-math', className)} style={style}>
      <MathJax.Node inline={true} formula={value} />
    </span>
  )
}

InlineMath.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
}

InlineMath.displayName = 'YozoraInlineMath'
export default InlineMath
