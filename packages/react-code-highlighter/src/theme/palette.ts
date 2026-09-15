import type { IThemeSchema } from '@yozora/react-core'
import { TokenNames } from '@yozora/react-core'
import type { IPrismTheme } from '../types/prism'

/** Adapt schema syntax roles at the highlighter boundary. */
export function schemaToPrismTheme(schema: Readonly<IThemeSchema>): IPrismTheme {
  const { colors, syntax } = schema
  return {
    plain: {
      color: colors[TokenNames.colorBody],
      backgroundColor: colors[TokenNames.colorBgBody],
    },
    styles: [
      { types: ['keyword'], style: { color: syntax.keyword } },
      { types: ['string', 'char', 'attr-value'], style: { color: syntax.string } },
      { types: ['function'], style: { color: syntax.function } },
      { types: ['class-name', 'builtin'], style: { color: syntax.type } },
      { types: ['constant', 'boolean'], style: { color: syntax.constant } },
      { types: ['variable'], style: { color: syntax.variable } },
      { types: ['parameter'], style: { color: syntax.parameter } },
      { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: syntax.comment } },
      { types: ['operator'], style: { color: syntax.operator } },
      { types: ['punctuation'], style: { color: syntax.punctuation } },
      { types: ['number'], style: { color: syntax.number } },
      { types: ['property'], style: { color: syntax.property } },
      { types: ['tag', 'selector'], style: { color: syntax.tag } },
      { types: ['attr-name'], style: { color: syntax.attribute } },
      { types: ['decorator', 'annotation'], style: { color: syntax.decorator } },
      { types: ['inserted'], style: { color: syntax.inserted } },
      { types: ['deleted'], style: { color: syntax.deleted } },
      { types: ['important', 'bold'], style: { fontWeight: 'bold' } },
      { types: ['italic'], style: { fontStyle: 'italic' } },
    ],
  }
}
