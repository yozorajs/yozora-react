import type { IAdmonition } from '@yozora/ast'
import AdmonitionRenderer from '@yozora/react-admonition'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraAdmonition: React.FC<IAdmonition> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  return (
    <AdmonitionRenderer
      keyword={props.keyword}
      title={renderYozoraNodes(props.title)}
    >
      {renderYozoraNodes(props.children)}
    </AdmonitionRenderer>
  )
}

AdmonitionRenderer.displayName = 'AdmonitionRenderer'
YozoraAdmonition.displayName = 'YozoraAdmonition'
export default YozoraAdmonition
