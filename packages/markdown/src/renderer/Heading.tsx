import type { Heading as IHeading } from '@yozora/ast'
import Heading from '@yozora/react-heading'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraHeadingRenderer: React.FC<IHeading> = props => {
  const { depth, identifier } = props
  return (
    <Heading identifier={identifier} level={depth}>
      <YozoraNodesRenderer nodes={props.children} />
    </Heading>
  )
}

YozoraHeadingRenderer.displayName = 'YozoraHeadingRenderer'
