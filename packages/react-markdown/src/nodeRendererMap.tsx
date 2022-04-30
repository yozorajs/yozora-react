import {
  AdmonitionType,
  CodeType,
  EcmaImportType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  InlineMathType,
  MathType,
} from '@yozora/ast'
import { AdmonitionRenderer } from './component/renderer/admonition'
import { CodeRenderer } from './component/renderer/code'
import { FootnoteReferenceRenderer } from './component/renderer/footnoteReference'
import { InlineMathRenderer } from './component/renderer/inlineMath'
import { MathRenderer } from './component/renderer/math'
import type { INodeRendererMap } from './types'

/**
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<Partial<INodeRendererMap>> = {
  [AdmonitionType]: AdmonitionRenderer,
  [CodeType]: CodeRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [InlineMathType]: InlineMathRenderer,
  [MathType]: MathRenderer,
}
