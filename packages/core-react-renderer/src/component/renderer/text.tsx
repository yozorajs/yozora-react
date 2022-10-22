import type { Text } from '@yozora/ast'
import React from 'react'

/**
 * Render yozora `text`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export class TextRenderer extends React.PureComponent<Text> {
  public override render(): React.ReactElement {
    return <React.Fragment>{this.props.value}</React.Fragment>
  }
}
