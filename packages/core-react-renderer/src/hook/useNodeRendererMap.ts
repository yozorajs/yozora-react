import {
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EmphasisType,
  HeadingType,
  HtmlType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  LinkReferenceType,
  LinkType,
  ListItemType,
  ListType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import React from 'react'
import { BlockquoteRenderer } from '../component/renderer/blockquote'
import { BreakRenderer } from '../component/renderer/break'
import { CodeRenderer } from '../component/renderer/code'
import { DeleteRenderer } from '../component/renderer/delete'
import { EmphasisRenderer } from '../component/renderer/emphasis'
import { HeadingRenderer } from '../component/renderer/heading'
import { ImageRenderer } from '../component/renderer/image'
import { ImageReferenceRenderer } from '../component/renderer/imageReference'
import { InlineCodeRenderer } from '../component/renderer/inlineCode'
import { LinkRenderer } from '../component/renderer/link'
import { LinkReferenceRenderer } from '../component/renderer/linkReference'
import { ListRenderer } from '../component/renderer/list'
import { ListItemRenderer } from '../component/renderer/listItem'
import { ParagraphRenderer } from '../component/renderer/paragraph'
import { StrongRenderer } from '../component/renderer/strong'
import { TableRenderer } from '../component/renderer/table'
import { TextRenderer } from '../component/renderer/text'
import { ThematicBreakRenderer } from '../component/renderer/thematicBreak'
import type { INodeRendererMap } from '../types'

export function useNodeRendererMap(
  customRendererMap?: Readonly<Partial<INodeRendererMap>>,
): Readonly<INodeRendererMap> {
  const rendererMap: INodeRendererMap = React.useMemo<INodeRendererMap>(() => {
    if (customRendererMap == null) return defaultNodeRendererMap

    let hasChanged = false
    const result: INodeRendererMap = {} as unknown as INodeRendererMap
    for (const [key, val] of Object.entries(customRendererMap)) {
      if (val && val === defaultNodeRendererMap[key]) {
        hasChanged = true
        result[key] = val
      }
    }

    return hasChanged ? { ...defaultNodeRendererMap, ...result } : defaultNodeRendererMap
  }, [customRendererMap])
  return rendererMap
}

/**
 * Default ast renderer map.
 */
export const defaultNodeRendererMap: Readonly<INodeRendererMap> = {
  [BlockquoteType]: BlockquoteRenderer,
  [BreakType]: BreakRenderer,
  [CodeType]: CodeRenderer,
  [DefinitionType]: () => null,
  [DeleteType]: DeleteRenderer,
  [EmphasisType]: EmphasisRenderer,
  [HeadingType]: HeadingRenderer,
  [HtmlType]: () => null,
  [ImageType]: ImageRenderer,
  [ImageReferenceType]: ImageReferenceRenderer,
  [InlineCodeType]: InlineCodeRenderer,
  [LinkType]: LinkRenderer,
  [LinkReferenceType]: LinkReferenceRenderer,
  [ListType]: ListRenderer,
  [ListItemType]: ListItemRenderer,
  [ParagraphType]: ParagraphRenderer,
  [StrongType]: StrongRenderer,
  [TableType]: TableRenderer,
  [TextType]: TextRenderer,
  [ThematicBreakType]: ThematicBreakRenderer,
  _fallback: function YozoraReactFallback(node, key) {
    console.warn(`Cannot find render for \`${node.type}\` type node with key \`${key}\`:`, node)
    return null
  },
}
