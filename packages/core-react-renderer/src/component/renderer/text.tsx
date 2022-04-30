import type { Text } from '@yozora/ast'
import React from 'react'
import type { INodeRenderer } from '../../types'

/**
 * Render yozora `text`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const TextRenderer: INodeRenderer<Text> = props => {
  return <React.Fragment>{props.value}</React.Fragment>
}
