import type { Code } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-react-renderer'
import { useThemeContext } from '@yozora/core-react-theme'
import CodeRenderer from '@yozora/react-code'
import React from 'react'
import { YozoraMarkdownContextType } from '../../context/context'

export const YozoraCodeRenderer: INodeRenderer<Code> = props => {
  const { lang, meta } = props
  const { theme, preference } = useThemeContext()
  const { codeRunners } = React.useContext(YozoraMarkdownContextType)
  const darken: boolean = theme === 'darken'

  // Remove trailing line endings.
  const value: string = props.value.replace(/[\r\n]+$/, '')

  return (
    <CodeRenderer
      lang={lang}
      value={value}
      meta={meta}
      runners={codeRunners}
      darken={darken}
      preferLineNo={preference.showCodeLineNo}
    />
  )
}
