import type { Blockquote } from '@yozora/ast'
import BlockquoteRenderer from '@yozora/react-blockquote'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraBlockquote(blockquote: Blockquote): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <BlockquoteRenderer>
      {renderYozoraNodes(blockquote.children)}
    </BlockquoteRenderer>
  )
}

YozoraBlockquote.displayName = 'YozoraBlockquote'
export default YozoraBlockquote
