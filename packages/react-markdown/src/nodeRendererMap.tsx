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
import FootnoteReferenceRenderer from '@yozora/react-footnote-reference'
import InlineMathRenderer from '@yozora/react-inline-math'
import MathRenderer from '@yozora/react-math'
import { YozoraAdmonitionRenderer } from './renderer/Admonition'
import { YozoraCodeRenderer } from './renderer/Code'
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
