import { MathJaxNode } from '@yozora/react-mathjax'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

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
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export function InlineMath(props: InlineMathProps): React.ReactElement {
  const { value, className, style } = props
  return (
    <MathJaxNode
      className={cn('yozora-inline-math', className)}
      style={style}
      inline={true}
      formula={value}
    />
  )
}

InlineMath.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
}

InlineMath.displayName = 'YozoraInlineMath'
export default InlineMath
