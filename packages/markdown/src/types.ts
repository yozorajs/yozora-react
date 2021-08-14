import type {
  Admonition,
  AdmonitionType,
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
  Footnote,
  FootnoteDefinition,
  FootnoteDefinitionType,
  FootnoteReference,
  FootnoteReferenceType,
  FootnoteType,
  Heading,
  HeadingType,
  Image,
  ImageReference,
  ImageReferenceType,
  ImageType,
  InlineCode,
  InlineCodeType,
  InlineMath,
  InlineMathType,
  Link,
  LinkReference,
  LinkReferenceType,
  LinkType,
  List,
  ListItem,
  ListItemType,
  ListType,
  Math,
  MathType,
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
  YastNode,
} from '@yozora/ast'
import type React from 'react'

/**
 * Preview image item.
 */
export interface PreviewImageItem {
  /**
   * Image url
   */
  src: string
  /**
   * Alt of image.
   */
  alt: string
}

/**
 * Api for managing preview images.
 */
export interface PreviewImageApi {
  /**
   * Add a preview image item.
   * @param item
   * @returns callback funcs to toggle the visible state of images.
   */
  addPreviewImage(item: PreviewImageItem): (visible: boolean) => void
}

/**
 * Context of TokenRenderer
 */
export interface TokenRendererContext {
  /**
   * Render child nodes.
   * @param children
   */
  renderNodes(nodes?: YastNode[]): React.ReactNode[]
  /**
   * Get link / image reference definition through the given identifier.
   * @param identifier
   */
  getDefinition(identifier: string): Readonly<Definition>
  /**
   * Get footnote reference definition through the give identifier.
   * @param identifier
   */
  getFootnoteDefinition(identifier: string): Readonly<FootnoteDefinition>
  /**
   * Add a preview image item.
   * @param item
   * @returns callback funcs to toggle the visible state of images.
   */
  addPreviewImage(item: PreviewImageItem): (visible: boolean) => void
}

/**
 * Renderer for Yozora markdown AST node.
 */
export type TokenRenderer<T extends YastNode = YastNode> = (
  node: T,
  key: string | number,
  ctx: TokenRendererContext,
) => React.ReactNode

/**
 * Renderer map.
 */
export interface TokenRendererMap {
  [AdmonitionType]: TokenRenderer<Admonition>
  [BlockquoteType]: TokenRenderer<Blockquote>
  [BreakType]: TokenRenderer<Break>
  [CodeType]: TokenRenderer<Code>
  [DefinitionType]: TokenRenderer<Definition>
  [DeleteType]: TokenRenderer<Delete>
  [EmphasisType]: TokenRenderer<Emphasis>
  [FootnoteType]: TokenRenderer<Footnote>
  [FootnoteReferenceType]: TokenRenderer<FootnoteReference>
  [FootnoteDefinitionType]: TokenRenderer<FootnoteDefinition>
  [HeadingType]: TokenRenderer<Heading>
  [ImageType]: TokenRenderer<Image>
  [ImageReferenceType]: TokenRenderer<ImageReference>
  [InlineCodeType]: TokenRenderer<InlineCode>
  [InlineMathType]: TokenRenderer<InlineMath>
  [LinkType]: TokenRenderer<Link>
  [LinkReferenceType]: TokenRenderer<LinkReference>
  [ListType]: TokenRenderer<List>
  [ListItemType]: TokenRenderer<ListItem>
  [MathType]: TokenRenderer<Math>
  [ParagraphType]: TokenRenderer<Paragraph>
  [StrongType]: TokenRenderer<Strong>
  [TableType]: TokenRenderer<Table>
  [TextType]: TokenRenderer<Text>
  [ThematicBreakType]: TokenRenderer<ThematicBreak>
  _fallback: TokenRenderer
  [key: string]: TokenRenderer<YastNode & any>
}

/**
 * Props of ImageViewer
 * @see https://github.com/infeng/react-viewer#props
 */
export interface ImageViewerProps {
  /**
   * Whether if the image viewer is visible.
   */
  visible: boolean
  /**
   * Image items.
   */
  images: Array<{ src: string; alt: string }>
  /**
   * Current activated index of image.
   */
  activeIndex?: number
  /**
   * Callback functions when close the image viewer.
   */
  onClose(): void
  /**
   * callback function when mask is clicked
   */
  onMaskClick(): void
}
