import type { IEmphasis } from '@yozora/ast'
import EmphasisRenderer from '@yozora/react-emphasis'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraEmphasis: React.FC<IEmphasis> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <EmphasisRenderer>{renderYozoraNodes(props.children)}</EmphasisRenderer>
  )
}

EmphasisRenderer.displayName = 'EmphasisRenderer'
YozoraEmphasis.displayName = 'YozoraEmphasis'
export default YozoraEmphasis
