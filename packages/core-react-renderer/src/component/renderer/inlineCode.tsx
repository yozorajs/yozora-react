import { css, cx } from '@emotion/css'
import type { InlineCode } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'

/**
 * Render yozora `inline-code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export class InlineCodeRenderer extends React.PureComponent<InlineCode> {
  public override render(): React.ReactElement {
    return <code className={cls}>{this.props.value}</code>
  }
}

const cls = cx(
  'yozora-inline-code',
  css({
    padding: '1px 4px',
    borderRadius: '4px',
    margin: 0,
    background: tokens.colorBgInlineCode,
    lineHeight: 1.375,
    color: tokens.colorInlineCode,
    fontFamily: tokens.fontFamilyCode,
    fontSize: 'min(1rem, 18px)',
    fontWeight: 500,
  }),
)
