import type { IParseCodeMetaOptions } from '@yozora/core-react-util'
import { parseCodeMeta as $parseCodeMeta } from '@yozora/core-react-util'
import type { ICodeMetaData } from './types'

export function parseCodeMeta(
  infoString: string | undefined,
  options: IParseCodeMetaOptions,
): ICodeMetaData {
  const { embed, literal, live, _yozoracodemode, ...remain } = $parseCodeMeta(infoString, options)
  let codeMode: 'live' | 'embed' | 'literal' | string | undefined
  if (typeof _yozoracodemode === 'string') codeMode = _yozoracodemode
  if (codeMode === undefined && literal) codeMode = 'literal'
  if (codeMode === undefined && embed) codeMode = 'embed'
  if (codeMode === undefined && live) codeMode = 'live'
  return {
    ...remain,
    _yozoracodemode: codeMode ?? 'literal',
  }
}
