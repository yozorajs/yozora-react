import type { IHeading } from '@yozora/ast'
import HeadingRenderer from '@yozora/react-heading'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraHeading(heading: IHeading): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { depth, identifier, children } = heading
  return (
    <HeadingRenderer identifier={identifier} level={depth}>
      {renderYozoraNodes(children)}
    </HeadingRenderer>
  )
}

YozoraHeading.displayName = 'YozoraHeading'
export default YozoraHeading
