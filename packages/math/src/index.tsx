import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import MathJax from 'react-mathjax'

export interface MathProps {
  /**
   * Literal math.
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
 * Render yozora `math`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export function Math(props: MathProps): React.ReactElement {
  const { value, className, style } = props
  return (
    <span className={cn('yozora-math', className)} style={style}>
      <MathJax.Node inline={false} formula={value} />
    </span>
  )
}

Math.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
}

Math.displayName = 'YozoraMath'
export default Math
