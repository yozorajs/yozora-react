import type { Node } from '@yozora/ast'
import { DeleteType, TableType } from '@yozora/ast'
import type { INodeRendererMap } from '@yozora/react'
import { defaultNodeRendererMap as baseRendererMap } from '@yozora/react-renderer'
import React from 'react'

function UnsupportedRenderer(node: Node): React.ReactElement {
  return React.createElement(baseRendererMap._fallback, node)
}

/** Match @yozora/parser-gfm; extension nodes remain unsupported until explicitly enabled. */
export const defaultNodeRendererMap: Readonly<INodeRendererMap> = {
  ...baseRendererMap,
  [DeleteType]: UnsupportedRenderer,
  [TableType]: UnsupportedRenderer,
}
