import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import type { IFootnoteDefinitionsProps } from './types'

/**
 * Render footnote definitions
 *
 * @see https://www.npmjs.com/package/@yozora/ast#footnote
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteReference
 * @see https://www.npmjs.com/package/@yozora/ast#footnoteDefinition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 */
export const FootnoteDefinitions: React.FC<
  IFootnoteDefinitionsProps
> = props => {
  const { nodes, title = 'footnote-definitions', className, style } = props

  return (
    <div className={cn('yozora-footnote-definitions', className)} style={style}>
      <div className="yozora-footnote-definitions__title">{title}</div>
      <ul className="yozora-footnote-definitions__main">
        {nodes.map(node => (
          <li
            key={node.identifier}
            id={node.identifier}
            className="yozora-footnote-definitions__item"
          >
            <p className="yozora-footnote-definitions__item-title yozora-paragraph">
              <a href={'#reference-' + node.identifier}>&uarr;</a>
              <span>{node.label}</span>
            </p>
            <div className="yozora-footnote-definitions__item-content">
              {node.children}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

FootnoteDefinitions.propTypes = {
  nodes: PropTypes.array.isRequired,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

FootnoteDefinitions.displayName = 'YozoraFootnoteDefinitions'
export default FootnoteDefinitions
