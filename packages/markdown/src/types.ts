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
  IAdmonition,
  IBlockquote,
  IBreak,
  ICode,
  IDefinition,
  IDelete,
  IEmphasis,
  IFootnote,
  IFootnoteDefinition,
  IFootnoteReference,
  IHeading,
  IImage,
  IImageReference,
  IInlineCode,
  IInlineMath,
  ILink,
  ILinkReference,
  IList,
  IListItem,
  IMath,
  IParagraph,
  IStrong,
  ITable,
  IText,
  IThematicBreak,
  IYastNode,
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

/**
 * Renderer for Yozora markdown AST node.
 */
export type TokenRenderer<T extends IYastNode = IYastNode> =
  | React.FC<T>
  | React.ComponentClass<T>

/**
 * Renderer map.
 */
export interface TokenRendererMap {
  [AdmonitionType]: TokenRenderer<IAdmonition>
  [BlockquoteType]: TokenRenderer<IBlockquote>
  [BreakType]: TokenRenderer<IBreak>
  [CodeType]: TokenRenderer<ICode>
  [DefinitionType]: TokenRenderer<IDefinition>
  [DeleteType]: TokenRenderer<IDelete>
  [EmphasisType]: TokenRenderer<IEmphasis>
  [FootnoteType]: TokenRenderer<IFootnote>
  [FootnoteReferenceType]: TokenRenderer<IFootnoteReference>
  [FootnoteDefinitionType]: TokenRenderer<IFootnoteDefinition>
  [HeadingType]: TokenRenderer<IHeading>
  [ImageType]: TokenRenderer<IImage>
  [ImageReferenceType]: TokenRenderer<IImageReference>
  [InlineCodeType]: TokenRenderer<IInlineCode>
  [InlineMathType]: TokenRenderer<IInlineMath>
  [LinkType]: TokenRenderer<ILink>
  [LinkReferenceType]: TokenRenderer<ILinkReference>
  [ListType]: TokenRenderer<IList>
  [ListItemType]: TokenRenderer<IListItem>
  [MathType]: TokenRenderer<IMath>
  [ParagraphType]: TokenRenderer<IParagraph>
  [StrongType]: TokenRenderer<IStrong>
  [TableType]: TokenRenderer<ITable>
  [TextType]: TokenRenderer<IText>
  [ThematicBreakType]: TokenRenderer<IThematicBreak>
  _fallback: TokenRenderer
  [key: string]: TokenRenderer<IYastNode & any>
}

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
  images: PreviewImageItem[]
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
