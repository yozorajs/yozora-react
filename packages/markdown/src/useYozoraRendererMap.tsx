import {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EcmaImportType,
  EmphasisType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  HeadingType,
  HtmlType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  InlineMathType,
  LinkReferenceType,
  LinkType,
  ListItemType,
  ListType,
  MathType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import FootnoteReferenceRenderer from '@yozora/react-footnote-reference'
import InlineMathRenderer from '@yozora/react-inline-math'
import MathRenderer from '@yozora/react-math'
import type React from 'react'
import { useMemo } from 'react'
import { YozoraAdmonitionRenderer } from './renderer/Admonition'
import { BlockquoteRenderer } from './renderer/blockquote'
import { BreakRenderer } from './renderer/break'
import { YozoraCodeRenderer } from './renderer/Code'
import { DeleteRenderer } from './renderer/delete'
import { EmphasisRenderer } from './renderer/emphasis'
import { HeadingRenderer } from './renderer/heading'
import { ImageRenderer } from './renderer/image'
import { ImageReferenceRenderer } from './renderer/imageReference'
import { InlineCodeRenderer } from './renderer/inlineCode'
import { LinkRenderer } from './renderer/link'
import { LinkReferenceRenderer } from './renderer/linkReference'
import { ListRenderer } from './renderer/List'
import { YozoraListItemRenderer } from './renderer/ListItem'
import { ParagraphRenderer } from './renderer/paragraph'
import { StrongRenderer } from './renderer/strong'
import { TableRenderer } from './renderer/table'
import { TextRenderer } from './renderer/text'
import { ThematicBreakRenderer } from './renderer/thematicBreak'
import type { INodeRendererMap } from './types'

/**
 * Create a markdown renderer map.
 */
export function useYozoraRendererMap(
  customRendererMap?: Readonly<Partial<INodeRendererMap>>,
): Readonly<INodeRendererMap> {
  const rendererMap: INodeRendererMap = useMemo<INodeRendererMap>(() => {
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
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<INodeRendererMap> = {
  [AdmonitionType]: YozoraAdmonitionRenderer,
  [BlockquoteType]: BlockquoteRenderer,
  [BreakType]: BreakRenderer as React.FC,
  [CodeType]: YozoraCodeRenderer,
  [DeleteType]: DeleteRenderer,
  [DefinitionType]: () => null,
  [EmphasisType]: EmphasisRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [HeadingType]: HeadingRenderer,
  [HtmlType]: () => null,
  [ImageType]: ImageRenderer,
  [ImageReferenceType]: ImageReferenceRenderer,
  [InlineCodeType]: InlineCodeRenderer,
  [InlineMathType]: InlineMathRenderer,
  [LinkType]: LinkRenderer,
  [LinkReferenceType]: LinkReferenceRenderer,
  [ListType]: ListRenderer,
  [ListItemType]: YozoraListItemRenderer,
  [MathType]: MathRenderer,
  [ParagraphType]: ParagraphRenderer,
  [StrongType]: StrongRenderer,
  [TableType]: TableRenderer,
  [TextType]: TextRenderer,
  [ThematicBreakType]: ThematicBreakRenderer as React.FC,
  _fallback: function YozoraReactFallback(node, key) {
    console.warn(`Cannot find render for \`${node.type}\` type node with key \`${key}\`:`, node)
    return null
  },
}
