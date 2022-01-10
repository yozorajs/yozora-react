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
import BreakRenderer from '@yozora/react-break'
import FootnoteReferenceRenderer from '@yozora/react-footnote-reference'
import InlineCodeRenderer from '@yozora/react-inline-code'
import InlineMathRenderer from '@yozora/react-inline-math'
import MathRenderer from '@yozora/react-math'
import TextRenderer from '@yozora/react-text'
import ThematicBreakRenderer from '@yozora/react-thematic-break'
import type React from 'react'
import { useMemo } from 'react'
import { YozoraAdmonitionRenderer } from './renderer/Admonition'
import { YozoraBlockquoteRenderer } from './renderer/Blockquote'
import { YozoraCodeRenderer } from './renderer/Code'
import { YozoraDeleteRenderer } from './renderer/Delete'
import { YozoraEmphasisRenderer } from './renderer/Emphasis'
import { YozoraHeadingRenderer } from './renderer/Heading'
import { YozoraImageRenderer } from './renderer/Image'
import { YozoraImageReferenceRenderer } from './renderer/ImageReference'
import { YozoraLinkRenderer } from './renderer/Link'
import { YozoraLinkReferenceRenderer } from './renderer/LinkReference'
import { YozoraListRenderer } from './renderer/List'
import { YozoraListItemRenderer } from './renderer/ListItem'
import { YozoraParagraphRenderer } from './renderer/Paragraph'
import { YozoraStrongRenderer } from './renderer/Strong'
import { YozoraTableRenderer } from './renderer/Table'
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
  [BlockquoteType]: YozoraBlockquoteRenderer,
  [BreakType]: BreakRenderer as React.FC,
  [CodeType]: YozoraCodeRenderer,
  [DeleteType]: YozoraDeleteRenderer,
  [DefinitionType]: () => null,
  [EmphasisType]: YozoraEmphasisRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [HeadingType]: YozoraHeadingRenderer,
  [HtmlType]: () => null,
  [ImageType]: YozoraImageRenderer,
  [ImageReferenceType]: YozoraImageReferenceRenderer,
  [InlineCodeType]: InlineCodeRenderer,
  [InlineMathType]: InlineMathRenderer,
  [LinkType]: YozoraLinkRenderer,
  [LinkReferenceType]: YozoraLinkReferenceRenderer,
  [ListType]: YozoraListRenderer,
  [ListItemType]: YozoraListItemRenderer,
  [MathType]: MathRenderer,
  [ParagraphType]: YozoraParagraphRenderer,
  [StrongType]: YozoraStrongRenderer,
  [TableType]: YozoraTableRenderer,
  [TextType]: TextRenderer,
  [ThematicBreakType]: ThematicBreakRenderer as React.FC,
  _fallback: function YozoraReactFallback(node, key) {
    console.warn(`Cannot find render for \`${node.type}\` type node with key \`${key}\`:`, node)
    return null
  },
}
