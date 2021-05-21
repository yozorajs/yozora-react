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
export function FootnoteDefinitions(
  props: FootnoteDefinitionsProps,
): React.ReactElement {
  const { nodes, className, style } = props

  return (
    <Container
      className={cn('yozora-footnote-definitions', className)}
      style={style}
    >
      <ul>
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
  children: PropTypes.node,
  style: PropTypes.object,
}

FootnoteDefinitions.displayName = 'YozoraFootnoteDefinitions'
