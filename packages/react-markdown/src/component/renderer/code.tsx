/* eslint-disable react/prop-types */
import type { Code } from '@yozora/ast'
import { type INodeRenderer, useNodeRendererState } from '@yozora/core-react-renderer'
import { useThemeContext } from '@yozora/core-react-theme'
import CodeRenderer0 from '@yozora/react-code'
import type { ICodeRunnerItem } from '@yozora/react-code-runners'
import React from 'react'

/**
 * Render yozora `code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export const createCodeRenderer = (
  codeRunners: ReadonlyArray<ICodeRunnerItem> | undefined,
): INodeRenderer<Code> => {
  const CodeRenderer: INodeRenderer<Code> = props => {
    const { lang, meta } = props
    const { theme } = useThemeContext()
    const showCodeLineno: boolean = useNodeRendererState(store => store.showCodeLineno$)
    const darken: boolean = theme === 'darken'

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
