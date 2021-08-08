import { MathJaxNode } from '@yozora/react-mathjax'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

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
export const Math: React.FC<MathProps> = props => {
  const { value, className, style } = props
  return (
    <MathJaxNode
      className={cn('yozora-math', className)}
      style={style}
      inline={false}
      formula={value}
    />
  )
}

Math.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
}

Math.displayName = 'YozoraMath'
export default Math
