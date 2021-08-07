import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { Container } from './style'
import type { FootnoteDefinitionsProps } from './types'

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
export const FootnoteDefinitions: React.FC<FootnoteDefinitionsProps> =
  props => {
    const { nodes, id, className, style } = props

    return (
      <Container
        id={id}
        className={cn('yozora-footnote-definitions', className)}
        style={style}
      >
        <div className="yozora-footnote-definitions__title" />
        <ul className="yozora-footnote-definitions__main">
          {nodes.map(node => (
            <li
              key={node.identifier}
              id={node.identifier}
              className="yozora-footnote-definitions__item"
            >
              <p className="yozora-footnote-definitions__item-title yozora-paragraph">
                <a href={'#reference-' + node.identifier}>&uarr;</a>
                &nbsp; [{node.label}]: &nbsp;&nbsp;
              </p>
              <div className="yozora-footnote-definitions__item-content">
                {node.children}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    )
  }

FootnoteDefinitions.propTypes = {
  nodes: PropTypes.array.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

FootnoteDefinitions.displayName = 'YozoraFootnoteDefinitions'
