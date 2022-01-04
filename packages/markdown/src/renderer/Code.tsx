import type { ICode } from '@yozora/ast'
import CodeRenderer from '@yozora/react-code'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraCode(code: ICode): React.ReactElement {
  const { darken, preferLinenos, codeRunners } = useContext(
    YozoraMarkdownContext,
  )

  const { lang, meta } = code

  // Remove trailing line endings.
  const value: string = code.value.replace(/[\r\n]+$/, '')

  return (
    <CodeRenderer
      lang={lang}
      value={value}
      meta={meta}
      runners={codeRunners}
      darken={darken}
      preferLinenos={preferLinenos}
    />
  )
}

YozoraCode.displayName = 'YozoraCode'
export default YozoraCode
