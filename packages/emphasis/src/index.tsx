import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface EmphasisProps {
  /**
   * Emphasis contents.
   */
  children?: React.ReactNode
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
 * Render yozora `emphasis`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export function Emphasis(props: EmphasisProps): React.ReactElement {
  const { children, className, style } = props
  return (
    <em className={cn('yozora-emphasis', className)} style={style}>
      {children}
    </em>
  )
}

Emphasis.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

Emphasis.displayName = 'YozoraEmphasis'
export default Emphasis
