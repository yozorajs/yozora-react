import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface IParagraphProps {
  /**
   * Paragraph content.
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
 * Render yozora `paragraph`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#paragraph
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export const Paragraph: React.FC<IParagraphProps> = props => {
  const { children, className, style } = props
  return (
    <p className={cn('yozora-paragraph', className)} style={style}>
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

Paragraph.displayName = 'YozoraParagraph'
export default Paragraph
