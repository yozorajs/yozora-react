/* eslint-disable react/prop-types */
import type { Code } from '@yozora/ast'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'
import type { INodeRenderer } from '../../types'
import { CodeRendererInner } from './inner/CodeRendererInner'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 */
export const CodeRenderer: INodeRenderer<Code> = props => {
  const { lang, meta, value } = props
  const { theme, showCodeLineNo } = useThemeContext()
  return (
    <CodeRendererInner
      lang={lang}
      meta={meta}
      value={value}
      theme={theme}
      preferLineNo={showCodeLineNo}
    />
  )
}
