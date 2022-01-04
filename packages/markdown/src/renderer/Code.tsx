import type { ICode } from '@yozora/ast'
import CodeRenderer from '@yozora/react-code'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraCode: React.FC<ICode> = props => {
  const { darken, preferLinenos, codeRunners } = useContext(
    YozoraMarkdownContext,
  )

  const { lang, meta } = props

  // Remove trailing line endings.
  const value: string = props.value.replace(/[\r\n]+$/, '')

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

CodeRenderer.displayName = 'CodeRenderer'
YozoraCode.displayName = 'YozoraCode'
export default YozoraCode
