import type { AlignType, Definition as MdastDefinition } from 'mdast'
export type {
  Blockquote as MdastBlockquote,
  Break as MdastBreak,
  Code as MdastCode,
  Definition as MdastDefinition,
  Delete as MdastDelete,
  Emphasis as MdastEmphasis,
  Footnote as MdastFootnote,
  FootnoteReference as MdastFootnoteReference,
  Heading as MdastHeading,
  Image as MdastImage,
  ImageReference as MdastImageReference,
  InlineCode as MdastInlineCode,
  Link as MdastLink,
  LinkReference as MdastLinkReference,
  List as MdastList,
  ListItem as MdastListItem,
  Paragraph as MdastParagraph,
  Parent as MdastParent,
  Root as MdastRoot,
  Strong as MdastStrong,
  Table as MdastTable,
  TableCell as MdastTableCell,
  TableRow as MdastTableRow,
  Text as MdastText,
  ThematicBreak as MdastThematicBreak,
} from 'mdast'


export type MdastPropsContent =
  | MdastPropsTopLevelContent
  | MdastPropsListContent
  | MdastPropsTableContent
  | MdastPropsRowContent
  | MdastPropsPhrasingContent

export type MdastPropsTopLevelContent = MdastPropsBlockContent

export type MdastPropsBlockContent =
  | MdastPropsParagraph
  | MdastPropsHeading
  | MdastPropsThematicBreak
  | MdastPropsBlockquote
  | MdastPropsList
  | MdastPropsTable
  | MdastPropsCode

export type MdastPropsListContent = MdastPropsListItem

export type MdastPropsTableContent = MdastPropsTableRow

export type MdastPropsRowContent = MdastPropsTableCell

export type MdastPropsPhrasingContent =
  | MdastPropsStaticPhrasingContent
  | MdastPropsLink
  | MdastPropsLinkReference

export type MdastPropsStaticPhrasingContent =
  | MdastPropsText
  | MdastPropsEmphasis
  | MdastPropsStrong
  | MdastPropsDelete
  | MdastPropsInlineCode
  | MdastPropsBreak
  | MdastPropsImage
  | MdastPropsImageReference
  | MdastPropsFootnote
  | MdastPropsFootnoteReference


/**
 *
 */
export interface MdastPropsMeta {
  /**
   * definition map
   */
  definitions: Record<string, MdastDefinition>
}


/**
 *
 */
export interface MdastPropsNode {
  /**
   * Data node type
   */
  type: string
  /**
   *
   */
  [key: string]: any
}


export interface MdastPropsParent extends MdastPropsNode {
  children: MdastPropsNode[]
}


export interface MdastPropsLiteral extends MdastPropsNode {
  value: string
}


/**
 * Mdast props ast
 */
export interface MdastPropsRoot {
  /**
   * Root node
   */
  type: 'root'
  /**
   * MdastProps meta data
   */
  meta: MdastPropsMeta
  /**
   * Child nodes
   */
  children: MdastPropsNode[]
}


/**
 * Blockquote
 */
export interface MdastPropsBlockquote extends MdastPropsParent {
  type: 'blockquote'
  children: MdastPropsBlockContent[]
}


/**
 * Break
 */
export interface MdastPropsBreak extends MdastPropsNode {
  type: 'break'
}


/**
 * Code
 */
export interface MdastPropsCode extends MdastPropsLiteral {
  type: 'code'
  /**
   * Language of code
   */
  lang?: string
  /**
   * Meta data of code
   */
  meta?: string
  /**
   * Parsed meta data
   */
  args: Record<string, unknown>
}


/**
 * Similar to Code, but render code as a prepared component
 */
export interface MdastPropsCodeEmbed extends Omit<MdastPropsCode, 'type'> {
  type: 'codeEmbed'
}


/**
 * Similar to Code, but create a live editor for both editing and preview
 */
export interface MdastPropsCodeLive extends Omit<MdastPropsCode, 'type'> {
  type: 'codeLive'
}


/**
 * Delete
 */
export interface MdastPropsDelete extends MdastPropsParent {
  type: 'delete'
  children: MdastPropsPhrasingContent[]
}


/**
 * Emphasis
 */
export interface MdastPropsEmphasis extends MdastPropsParent {
  type: 'emphasis'
  children: MdastPropsPhrasingContent[]
}


/**
 * Footnote
 */
export interface MdastPropsFootnote extends MdastPropsParent {
  type: 'footnote'
  children: MdastPropsPhrasingContent[]
}


/**
 * FootnoteReference
 */
export interface MdastPropsFootnoteReference extends MdastPropsParent {
  type: 'footnoteReference'
  children: MdastPropsPhrasingContent[]
}


/**
 * Heading
 */
export interface MdastPropsHeading extends MdastPropsParent {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: MdastPropsPhrasingContent[]
}


/**
 * Image
 */
export interface MdastPropsImage extends MdastPropsNode {
  type: 'image'
  url: string
  title?: string
  alt?: string
}


/**
 * ImageReference
 */
export interface MdastPropsImageReference extends MdastPropsNode {
  type: 'imageReference'
  url: string
  title?: string
  alt?: string
}


/**
 * InlineCode
 */
export interface MdastPropsInlineCode extends MdastPropsLiteral {
  type: 'inlineCode'
}


/**
 * InlineMath
 */
export interface MdastPropsInlineMath extends MdastPropsLiteral {
  type: 'inlineMath'
}


/**
 * Link
 */
export interface MdastPropsLink extends MdastPropsParent {
  type: 'link'
  url: string
  title?: string
  children: MdastPropsStaticPhrasingContent[]
}


/**
 * Link reference
 */
export interface MdastPropsLinkReference extends MdastPropsParent {
  type: 'linkReference'
  url: string
  title?: string
  children: MdastPropsStaticPhrasingContent[]
}


/**
 * List
 */
export interface MdastPropsList extends MdastPropsParent {
  type: 'list'
  ordered: boolean
  start?: number
  spread: boolean
  children: MdastPropsListContent[]
}


/**
 * List item
 */
export interface MdastPropsListItem extends MdastPropsParent {
  type: 'listItem'
  checked?: boolean
  spread: boolean
}


/**
 * Paragraph
 */
export interface MdastPropsParagraph extends MdastPropsParent {
  type: 'paragraph'
  children: MdastPropsPhrasingContent[]
}


/**
 * Strong
 */
export interface MdastPropsStrong extends MdastPropsParent {
  type: 'strong'
  children: MdastPropsPhrasingContent[]
}


/**
 * Table
 */
export interface MdastPropsTable extends MdastPropsNode {
  type: 'table'
  children: MdastPropsTableRow[]
}


/**
 * Table cell
 */
export interface MdastPropsTableCell extends MdastPropsParent {
  type: 'tableCell'
  align?: AlignType
  children: MdastPropsPhrasingContent[]
}


/**
 * Table row
 */
export interface MdastPropsTableRow extends MdastPropsParent {
  type: 'tableRow'
  children: MdastPropsRowContent[]
}


/**
 * Text
 */
export interface MdastPropsText extends MdastPropsLiteral {
  type: 'text'
}


/**
 * Thematic break
 */
export interface MdastPropsThematicBreak extends MdastPropsNode {
  type: 'thematicBreak'
}
