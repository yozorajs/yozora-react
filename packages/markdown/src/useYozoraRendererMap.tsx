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
import YozoraAdmonition from './renderer/Admonition'
import YozoraBlockquote from './renderer/Blockquote'
import YozoraCode from './renderer/Code'
import YozoraDelete from './renderer/Delete'
import YozoraEmphasis from './renderer/Emphasis'
import YozoraHeading from './renderer/Heading'
import YozoraImage from './renderer/Image'
import YozoraImageReference from './renderer/ImageReference'
import YozoraLink from './renderer/Link'
import YozoraLinkReference from './renderer/LinkReference'
import YozoraList from './renderer/List'
import YozoraListItem from './renderer/ListItem'
import YozoraParagraph from './renderer/Paragraph'
import YozoraStrong from './renderer/Strong'
import YozoraTable from './renderer/Table'
import type { ITokenRendererMap } from './types'

/**
 * Create a markdown renderer map.
 */
export function useYozoraRendererMap(
  customRendererMap?: Readonly<Partial<ITokenRendererMap>>,
): Readonly<ITokenRendererMap> {
  const rendererMap: ITokenRendererMap = useMemo<ITokenRendererMap>(() => {
    if (customRendererMap == null) return defaultYozoraRendererMap

    let changedFlag = false
    const result: ITokenRendererMap = {} as unknown as ITokenRendererMap
    for (const [key, val] of Object.entries(customRendererMap)) {
      if (val == null) continue

      changedFlag = true
      result[key] = val
    }

    return changedFlag
      ? { ...defaultYozoraRendererMap, ...result }
      : defaultYozoraRendererMap
  }, [customRendererMap])
  return rendererMap
}

export default useYozoraRendererMap

/**
 * Default yozora renderer map.
 */
export const defaultYozoraRendererMap: Readonly<ITokenRendererMap> = {
  [AdmonitionType]: YozoraAdmonition,
  [BlockquoteType]: YozoraBlockquote,
  [BreakType]: BreakRenderer as React.FC,
  [CodeType]: YozoraCode,
  [DeleteType]: YozoraDelete,
  [DefinitionType]: () => null,
  [EmphasisType]: YozoraEmphasis,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [HeadingType]: YozoraHeading,
  [HtmlType]: () => null,
  [ImageType]: YozoraImage,
  [ImageReferenceType]: YozoraImageReference,
  [InlineCodeType]: InlineCodeRenderer,
  [InlineMathType]: InlineMathRenderer,
  [LinkType]: YozoraLink,
  [LinkReferenceType]: YozoraLinkReference,
  [ListType]: YozoraList,
  [ListItemType]: YozoraListItem,
  [MathType]: MathRenderer,
  [ParagraphType]: YozoraParagraph,
  [StrongType]: YozoraStrong,
  [TableType]: YozoraTable,
  [TextType]: TextRenderer,
  [ThematicBreakType]: ThematicBreakRenderer as React.FC,
  _fallback: function YozoraReactFallback(node, key) {
    console.warn(
      `Cannot find render for \`${node.type}\` type node with key \`${key}\`:`,
      node,
    )
    return null
  },
}
