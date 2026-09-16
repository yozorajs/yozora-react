import type { Code } from '@yozora/ast'
import { Code as CodeRenderer0 } from '@yozora/react-code'
import type { ICodeRunnerItem, INodeRenderer } from '@yozora/react-core'
import { useNodeRendererState, useThemeContext } from '@yozora/react-core'
import React from 'react'

/**
 * Render yozora `code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 */
export const createCodeRenderer = (
  codeRunners: ReadonlyArray<ICodeRunnerItem> | undefined,
): INodeRenderer<Code> => {
  const CodeRenderer: INodeRenderer<Code> = props => {
    const { lang, meta } = props
    const { schema } = useThemeContext()
    const showCodeLineno: boolean = useNodeRendererState(store => store.showCodeLineno$)
    const darken = schema ? undefined : false

    // Remove trailing line endings.
    const value: string = props.value.replace(/[\r\n]+$/, '')

    return (
      <CodeRenderer0
        lang={lang}
        value={value}
        meta={meta}
        runners={codeRunners}
        darken={darken}
        showCodeLineno={showCodeLineno}
      />
    )
  }
  CodeRenderer.displayName = 'YozoraCodeRenderer'
  return CodeRenderer
}
