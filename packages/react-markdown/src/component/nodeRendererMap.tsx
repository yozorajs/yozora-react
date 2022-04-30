import {
  AdmonitionType,
  EcmaImportType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  InlineMathType,
  MathType,
} from '@yozora/ast'
import type { INodeRendererMap } from '../types'
import { AdmonitionRenderer } from './renderer/admonition'
import { FootnoteReferenceRenderer } from './renderer/footnoteReference'
import { InlineMathRenderer } from './renderer/inlineMath'
import { MathRenderer } from './renderer/math'

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
  [MathType]: MathRenderer,
}
