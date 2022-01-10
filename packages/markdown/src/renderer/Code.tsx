import type { ICode } from '@yozora/ast'
import Code from '@yozora/react-code'
import React, { useContext } from 'react'
import { YozoraMarkdownContextType } from '../context/context'

export const YozoraCodeRenderer: React.FC<ICode> = props => {
  const { darken, preferLinenos, codeRunners } = useContext(YozoraMarkdownContextType)

  const { lang, meta } = props

  // Remove trailing line endings.
  const value: string = props.value.replace(/[\r\n]+$/, '')

  return (
    <Code
      lang={lang}
      value={value}
      meta={meta}
      runners={codeRunners}
      darken={darken}
      preferLinenos={preferLinenos}
    />
  )
}

YozoraCodeRenderer.displayName = 'YozoraCodeRenderer'
