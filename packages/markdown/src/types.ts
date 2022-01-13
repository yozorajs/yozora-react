import type {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EmphasisType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  HeadingType,
  Admonition as IAdmonition,
  Blockquote as IBlockquote,
  Break as IBreak,
  Code as ICode,
  Definition as IDefinition,
  Delete as IDelete,
  Emphasis as IEmphasis,
  Footnote as IFootnote,
  FootnoteDefinition as IFootnoteDefinition,
  FootnoteReference as IFootnoteReference,
  Heading as IHeading,
  Image as IImage,
  ImageReference as IImageReference,
  InlineCode as IInlineCode,
  InlineMath as IInlineMath,
  Link as ILink,
  LinkReference as ILinkReference,
  List as IList,
  ListItem as IListItem,
  Math as IMath,
  Paragraph as IParagraph,
  Strong as IStrong,
  Table as ITable,
  Text as IText,
  ThematicBreak as IThematicBreak,
  Node as IYastNode,
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
import type React from 'react'

// Renderer for Yozora markdown AST node.
export type INodeRenderer<T extends IYastNode = IYastNode> = React.ComponentType<T>

/**
 * Renderer map.
 */
export interface INodeRendererMap {
  [AdmonitionType]: INodeRenderer<IAdmonition>
  [BlockquoteType]: INodeRenderer<IBlockquote>
  [BreakType]: INodeRenderer<IBreak>
  [CodeType]: INodeRenderer<ICode>
  [DefinitionType]: INodeRenderer<IDefinition>
  [DeleteType]: INodeRenderer<IDelete>
  [EmphasisType]: INodeRenderer<IEmphasis>
  [FootnoteType]: INodeRenderer<IFootnote>
  [FootnoteReferenceType]: INodeRenderer<IFootnoteReference>
  [FootnoteDefinitionType]: INodeRenderer<IFootnoteDefinition>
  [HeadingType]: INodeRenderer<IHeading>
  [ImageType]: INodeRenderer<IImage>
  [ImageReferenceType]: INodeRenderer<IImageReference>
  [InlineCodeType]: INodeRenderer<IInlineCode>
  [InlineMathType]: INodeRenderer<IInlineMath>
  [LinkType]: INodeRenderer<ILink>
  [LinkReferenceType]: INodeRenderer<ILinkReference>
  [ListType]: INodeRenderer<IList>
  [ListItemType]: INodeRenderer<IListItem>
  [MathType]: INodeRenderer<IMath>
  [ParagraphType]: INodeRenderer<IParagraph>
  [StrongType]: INodeRenderer<IStrong>
  [TableType]: INodeRenderer<ITable>
  [TextType]: INodeRenderer<IText>
  [ThematicBreakType]: INodeRenderer<IThematicBreak>
  _fallback: INodeRenderer
  [key: string]: INodeRenderer<IYastNode & any>
}

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

/**
 * Api for managing preview images.
 */
export interface IPreviewImageApi {
  /**
   * Add a preview image item.
   * @param item
   * @returns callback funcs to toggle the visible state of images.
   */
  addPreviewImage(item: IPreviewImageItem): (visible: boolean) => void
}

/**
 * Props of ImageViewer
 * @see https://github.com/infeng/react-viewer#props
 */
export interface IImageViewerProps {
  /**
   * Whether if the image viewer is visible.
   */
  visible: boolean
  /**
   * Image items.
   */
  images: IPreviewImageItem[]
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
