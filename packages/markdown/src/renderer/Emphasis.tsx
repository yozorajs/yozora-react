import type { Emphasis } from '@yozora/ast'
import EmphasisRenderer from '@yozora/react-emphasis'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraEmphasis(emphasis: Emphasis): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <EmphasisRenderer>{renderYozoraNodes(emphasis.children)}</EmphasisRenderer>
  )
}

YozoraEmphasis.displayName = 'YozoraEmphasis'
export default YozoraEmphasis
