import type { Text } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `text`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const TextRenderer: React.FC<Text> = props => {
  return <React.Fragment>{props.value}</React.Fragment>
}
