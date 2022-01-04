import type { IBlockquote } from '@yozora/ast'
import BlockquoteRenderer from '@yozora/react-blockquote'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraBlockquote: React.FC<IBlockquote> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <BlockquoteRenderer>{renderYozoraNodes(props.children)}</BlockquoteRenderer>
  )
}

YozoraBlockquote.displayName = 'YozoraBlockquote'
export default YozoraBlockquote
