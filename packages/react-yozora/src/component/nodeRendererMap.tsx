import type {
  Admonition,
  EcmaImport,
  Footnote,
  FootnoteDefinition,
  FootnoteReference,
  Frontmatter,
  Math as IMath,
  InlineMath,
} from '@yozora/ast'
import {
  AdmonitionType,
  CodeType,
  EcmaImportType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  FrontmatterType,
  InlineMathType,
  MathType,
} from '@yozora/ast'
import { defaultNodeRendererMap as gfmExRendererMap } from '@yozora/react-gfm-ex'
import type { INodeRenderer, INodeRendererMap as INodeRendererMap0 } from '@yozora/react-renderer'
import { AdmonitionRenderer } from './renderer/admonition'
import { createCodeRenderer } from './renderer/code'
import { FootnoteReferenceRenderer } from './renderer/footnoteReference'
import { InlineMathRenderer } from './renderer/inlineMath'
import { MathRenderer } from './renderer/math'

export interface INodeRendererMap extends INodeRendererMap0 {
  [AdmonitionType]: INodeRenderer<Admonition>
  [EcmaImportType]: INodeRenderer<EcmaImport>
  [FootnoteType]: INodeRenderer<Footnote>
  [FootnoteReferenceType]: INodeRenderer<FootnoteReference>
  [FootnoteDefinitionType]: INodeRenderer<FootnoteDefinition>
  [FrontmatterType]: INodeRenderer<Frontmatter>
  [InlineMathType]: INodeRenderer<InlineMath>
  [MathType]: INodeRenderer<IMath>
}

/**
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<INodeRendererMap> = {
  ...gfmExRendererMap,
  [CodeType]: createCodeRenderer(undefined),
  [AdmonitionType]: AdmonitionRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FrontmatterType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [InlineMathType]: InlineMathRenderer,
  [MathType]: MathRenderer,
}
