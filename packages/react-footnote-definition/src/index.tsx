import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import './style.styl'

export interface IFootnoteDefinitionProps {
  /**
   * Footnote reference label.
   */
  label: string
  /**
   * Footnote reference identifier.
   */
  identifier: string
  /**
   * Toc title
   */
  children: React.ReactNode
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
 * Render footnote definition
 *
 * @see https://www.npmjs.com/package/@yozora/ast#footnote
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteReference
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteDefinition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 */
export const FootnoteDefinition: React.FC<IFootnoteDefinitionProps> = props => {
  const { identifier, label, children, className, style } = props
  return (
    <li
      key={identifier}
      id={identifier}
      className={cn('yozora-footnote-definition', className)}
      style={style}
    >
      <p className="yozora-footnote-definition__title yozora-paragraph">
        <a href={'#reference-' + identifier}>&uarr;</a>
        <span>{label}</span>
      </p>
      <div className="yozora-footnote-definition__content">{children}</div>
    </li>
  )
}

FootnoteDefinition.propTypes = {
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

FootnoteDefinition.displayName = 'YozoraFootnoteDefinition'
export default FootnoteDefinition
