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
import { YozoraAdmonitionRenderer } from './component/renderer/Admonition'
import { YozoraCodeRenderer } from './component/renderer/Code'
import { FootnoteReferenceRenderer } from './component/renderer/footnoteReference'
import { InlineMathRenderer } from './component/renderer/inlineMath'
import { MathRenderer } from './component/renderer/math'
import type { INodeRendererMap } from './types'

/**
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<Partial<INodeRendererMap>> = {
  [AdmonitionType]: YozoraAdmonitionRenderer,
  [CodeType]: YozoraCodeRenderer,
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [InlineMathType]: InlineMathRenderer,
  [MathType]: MathRenderer,
}
