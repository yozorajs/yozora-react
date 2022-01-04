import type { IHeading } from '@yozora/ast'
import HeadingRenderer from '@yozora/react-heading'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export const YozoraHeading: React.FC<IHeading> = props => {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { depth, identifier, children } = props
  return (
    <HeadingRenderer identifier={identifier} level={depth}>
      {renderYozoraNodes(children)}
    </HeadingRenderer>
  )
}

HeadingRenderer.displayName = 'HeadingRenderer'
YozoraHeading.displayName = 'YozoraHeading'
export default YozoraHeading
