import React from 'react'
import { MathJaxContextType } from './context'
import { MathJaxNodeWithoutContext } from './MathJaxNodeWithoutContext'

interface IMathJaxNodeProps {
  /**
   * The literal formula string.
   */
  formula: string
  /**
   * Whether to render the formulas in inline mode.
   * @default false
   */
  inline?: boolean
  /**
   * CSS class name.
   */
  className?: string
  /**
   * CSS style properties
   */
  style?: React.CSSProperties
}

export const MathJaxNode: React.FC<IMathJaxNodeProps> = props => {
  const { inline = false, className, style } = props
  const { MathJax3, language } = React.useContext(MathJaxContextType)
  const formula = props.formula.trim()

  if (MathJax3) {
    return (
      <MathJaxNodeWithoutContext
        MathJax3={MathJax3}
        language={language}
        formula={formula}
        inline={inline}
        className={className}
        style={style}
      />
    )
  }

  // Fallback, show source formula.
  return inline ? (
    <span className={className} style={style}>
      ${formula}$
    </span>
  ) : (
    <div className={className} style={style}>
      $${formula}$$
    </div>
  )
}
