import PropTypes from 'prop-types'
import React from 'react'

export interface ThematicBreakProps
  extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Root css class of the component
   * @default 'yozora-thematic-break'
   */
  className?: string
}

/**
 * Render yozora `thematicBreak`.
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export const ThematicBreak = React.forwardRef<
  HTMLHRElement,
  ThematicBreakProps
>(
  (props, forwardRef): React.ReactElement => {
    const {
      className = 'yozora-thematic-break',
      // eslint-disable-next-line react/prop-types
      children: _, // children is not allowed.
      ...htmlProps
    } = props
    return <hr {...htmlProps} ref={forwardRef} className={className} />
  },
)

ThematicBreak.propTypes = {
  className: PropTypes.string,
}

ThematicBreak.displayName = 'YozoraThematicBreak'
export default ThematicBreak
