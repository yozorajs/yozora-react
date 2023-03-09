/**
 * @see https://github.com/PrismJS/prism/blob/master/components/prism-tsx.js
 */

import type { Grammar } from 'prismjs'
import Prism from 'prismjs'
import './prism-typescript'

const typescript = Prism.util.clone(Prism.languages.typescript)
Prism.languages.tsx = Prism.languages.extend('jsx', typescript)

// doesn't work with TS because TS is too complex
delete (Prism.languages.tsx as any).parameter
delete Prism.languages.tsx['literal-property']

// This will prevent collisions between TSX tags and TS generic types.
// Idea by https://github.com/karlhorky
// Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928
const tag = (Prism.languages.tsx as Grammar & { tag: any }).tag
tag.pattern = RegExp(
  /(^|[^\w$]|(?=<\/))/.source + '(?:' + tag.pattern.source + ')',
  tag.pattern.flags,
)
tag.lookbehind = true
