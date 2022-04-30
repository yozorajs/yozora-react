import type {
  Admonition,
  AdmonitionType,
  EcmaImport,
  EcmaImportType,
  Footnote,
  FootnoteDefinition,
  FootnoteDefinitionType,
  FootnoteReference,
  FootnoteReferenceType,
  FootnoteType,
  InlineMath,
  InlineMathType,
  Math,
  MathType,
} from '@yozora/ast'
import type {
  INodeRenderer,
  INodeRendererMap as INodeRendererMap0,
} from '@yozora/core-react-renderer'

export interface INodeRendererMap extends INodeRendererMap0 {
  [AdmonitionType]: INodeRenderer<Admonition>
  [EcmaImportType]: INodeRenderer<EcmaImport>
  [FootnoteType]: INodeRenderer<Footnote>
  [FootnoteReferenceType]: INodeRenderer<FootnoteReference>
  [FootnoteDefinitionType]: INodeRenderer<FootnoteDefinition>
  [InlineMathType]: INodeRenderer<InlineMath>
  [MathType]: INodeRenderer<Math>
}
