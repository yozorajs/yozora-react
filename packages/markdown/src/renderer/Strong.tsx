import type { IStrong } from '@yozora/ast'
import StrongRenderer from '@yozora/react-strong'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraStrong: React.FC<IStrong> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return <StrongRenderer>{renderYozoraNodes(props.children)}</StrongRenderer>
}

StrongRenderer.displayName = 'StrongRenderer'
YozoraStrong.displayName = 'YozoraStrong'
export default YozoraStrong
