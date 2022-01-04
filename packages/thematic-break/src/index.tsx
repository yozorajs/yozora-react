import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface IThematicBreakProps {
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
 * Render yozora `thematicBreak`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#thematicBreak
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export const ThematicBreak: React.FC<IThematicBreakProps> = props => {
  const { className, style } = props
  return <hr className={cn('yozora-thematic-break', className)} style={style} />
}

ThematicBreak.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

ThematicBreak.displayName = 'YozoraThematicBreak'
export default ThematicBreak
