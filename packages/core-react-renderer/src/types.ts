import type {
  Blockquote,
  BlockquoteType,
  Break,
  BreakType,
  Code,
  CodeType,
  Definition,
  DefinitionType,
  Delete,
  DeleteType,
  Emphasis,
  EmphasisType,
  Heading,
  HeadingType,
  Image,
  ImageReference,
  ImageReferenceType,
  ImageType,
  InlineCode,
  InlineCodeType,
  Link,
  LinkReference,
  LinkReferenceType,
  LinkType,
  List,
  ListItem,
  ListItemType,
  ListType,
  Paragraph,
  ParagraphType,
  Strong,
  StrongType,
  Table,
  TableType,
  Text,
  TextType,
  ThematicBreak,
  ThematicBreakType,
  Node as YastNode,
} from '@yozora/ast'
import type React from 'react'

export type INodeRendererProps<T extends YastNode> = T

// Renderer for Yozora markdown AST node.
export type INodeRenderer<T extends YastNode = YastNode> = React.ComponentType<
  INodeRendererProps<T>
>

/**
 * Renderer map.
 */
export interface INodeRendererMap {
  [BlockquoteType]: INodeRenderer<Blockquote>
  [BreakType]: INodeRenderer<Break>
  [CodeType]: INodeRenderer<Code>
  [DefinitionType]: INodeRenderer<Definition>
  [DeleteType]: INodeRenderer<Delete>
  [EmphasisType]: INodeRenderer<Emphasis>
  [HeadingType]: INodeRenderer<Heading>
  [ImageType]: INodeRenderer<Image>
  [ImageReferenceType]: INodeRenderer<ImageReference>
  [InlineCodeType]: INodeRenderer<InlineCode>
  [LinkType]: INodeRenderer<Link>
  [LinkReferenceType]: INodeRenderer<LinkReference>
  [ListType]: INodeRenderer<List>
  [ListItemType]: INodeRenderer<ListItem>
  [ParagraphType]: INodeRenderer<Paragraph>
  [StrongType]: INodeRenderer<Strong>
  [TableType]: INodeRenderer<Table>
  [TextType]: INodeRenderer<Text>
  [ThematicBreakType]: INodeRenderer<ThematicBreak>
  _fallback: INodeRenderer
  [key: string]: INodeRenderer<YastNode & any>
}

export type INodeStyleMap = Record<Exclude<keyof INodeRendererMap, '_fallback'>, string>

/**
 * Preview image item.
 */
export interface IPreviewImageItem {
  /**
   * Image url
   */
  src: string
  /**
   * Alt of image.
   */
  alt: string
}
