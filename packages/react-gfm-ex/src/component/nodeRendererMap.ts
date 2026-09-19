import { DeleteType, ListItemType, TableType } from '@yozora/ast'
import type { INodeRendererMap } from '@yozora/react'
import { defaultNodeRendererMap as gfmRendererMap } from '@yozora/react-gfm'
import { DeleteRenderer, TableRenderer } from '@yozora/react-renderer'
import { ListItemRenderer } from './renderer/listItem'

export const defaultNodeRendererMap: Readonly<INodeRendererMap> = {
  ...gfmRendererMap,
  [DeleteType]: DeleteRenderer,
  [ListItemType]: ListItemRenderer,
  [TableType]: TableRenderer,
}
