import type {
  Admonition,
  EcmaImport,
  Footnote,
  FootnoteDefinition,
  FootnoteReference,
  InlineMath,
  ListItem,
  Math,
} from '@yozora/ast'
import {
  AdmonitionType,
  EcmaImportType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  InlineMathType,
  ListItemType,
  MathType,
} from '@yozora/ast'
import type {
  INodeRenderer,
  INodeRendererMap as INodeRendererMap0,
} from '@yozora/core-react-renderer'
import { AdmonitionRenderer } from './renderer/admonition'
import { FootnoteReferenceRenderer } from './renderer/footnoteReference'
import { InlineMathRenderer } from './renderer/inlineMath'
import { ListItemRenderer } from './renderer/listItem'
import { MathRenderer } from './renderer/math'

export interface INodeRendererMap extends INodeRendererMap0 {
  [AdmonitionType]: INodeRenderer<Admonition>
  [EcmaImportType]: INodeRenderer<EcmaImport>
  [FootnoteType]: INodeRenderer<Footnote>
  [FootnoteReferenceType]: INodeRenderer<FootnoteReference>
  [FootnoteDefinitionType]: INodeRenderer<FootnoteDefinition>
  [InlineMathType]: INodeRenderer<InlineMath>
  [ListItemType]: INodeRenderer<ListItem>
  [MathType]: INodeRenderer<Math>
}

/**
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<Partial<INodeRendererMap>> = {
  [AdmonitionType]: AdmonitionRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [InlineMathType]: InlineMathRenderer,
  [ListItemType]: ListItemRenderer,
  [MathType]: MathRenderer,
}
