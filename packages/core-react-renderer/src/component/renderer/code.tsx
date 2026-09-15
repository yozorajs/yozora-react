import type { Code } from '@yozora/ast'
import { useThemeContext } from '@yozora/react-core'
import React from 'react'
import { useNodeRendererState } from '../../context'
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
  const { schema } = useThemeContext()
  const showCodeLineno: boolean = useNodeRendererState(store => store.showCodeLineno$)

  return (
    <CodeRendererInner
      lang={lang}
      meta={meta}
      value={value}
      darken={schema ? undefined : false}
      showCodeLineno={showCodeLineno}
    />
  )
}
