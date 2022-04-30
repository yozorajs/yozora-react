import { AdmonitionType, CodeType } from '@yozora/ast'
import { YozoraAdmonitionRenderer } from './renderer/Admonition'
import { YozoraCodeRenderer } from './renderer/Code'
import type { INodeRendererMap } from './types'

/**
 * Default yozora renderer map.
 */
export const defaultNodeRendererMap: Readonly<Partial<INodeRendererMap>> = {
  [AdmonitionType]: YozoraAdmonitionRenderer,
  [CodeType]: YozoraCodeRenderer,
}
