import type { IAdmonition } from '@yozora/ast'
import AdmonitionRenderer from '@yozora/react-admonition'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraAdmonition(admonition: IAdmonition): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <AdmonitionRenderer
      keyword={admonition.keyword}
      title={renderYozoraNodes(admonition.title)}
    >
      {renderYozoraNodes(admonition.children)}
    </AdmonitionRenderer>
  )
}

YozoraAdmonition.displayName = 'YozoraAdmonition'
export default YozoraAdmonition
