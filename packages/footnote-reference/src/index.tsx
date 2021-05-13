import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

export interface FootnoteReferenceProps {
  /**
   * Footnote reference identifier
   */
  identifier: string
  /**
   * Footnote reference label
   */
  label: string
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
 * Render yozora `footnoteReference`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#footnotereference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 */
export function FootnoteReference(
  props: FootnoteReferenceProps,
): React.ReactElement {
  const { className, style, identifier, label } = props
  return (
    <sup
      id={'reference-' + identifier}
      className={cn('yozora-footnote-reference', className)}
      style={style}
    >
      <a href={'#' + identifier} title={label}>
        [{label}]
      </a>
    </sup>
  )
}

FootnoteReference.propTypes = {
  className: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
}

FootnoteReference.displayName = 'YozoraFootnoteReference'
export default FootnoteReference
