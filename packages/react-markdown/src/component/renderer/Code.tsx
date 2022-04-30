import type { Code as ICode } from '@yozora/ast'
import { useThemeContext } from '@yozora/core-react-theme'
import Code from '@yozora/react-code'
import React from 'react'
import { YozoraMarkdownContextType } from '../../context/context'

export const YozoraCodeRenderer: React.FC<ICode> = props => {
  const { lang, meta } = props
  const { theme, preference } = useThemeContext()
  const { codeRunners } = React.useContext(YozoraMarkdownContextType)
  const darken: boolean = theme === 'darken'

  // Remove trailing line endings.
  const value: string = props.value.replace(/[\r\n]+$/, '')

  return (
    <Code
      lang={lang}
      value={value}
      meta={meta}
      runners={codeRunners}
      darken={darken}
      preferLineNo={preference.showCodeLineNo}
    />
  )
}
