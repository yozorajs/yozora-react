import type { IStrong } from '@yozora/ast'
import StrongRenderer from '@yozora/react-strong'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraStrong(strong: IStrong): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return <StrongRenderer>{renderYozoraNodes(strong.children)}</StrongRenderer>
}

YozoraStrong.displayName = 'YozoraStrong'
export default YozoraStrong
