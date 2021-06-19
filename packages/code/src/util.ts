import { collectNumbers } from '@guanghechen/parse-lineno'
import type { CodeMetaData } from './types'

/**
 * Parser code meta.
 * @param meta
 * @returns
 */
export function parseCodeMeta(meta: string): CodeMetaData {
  const result: CodeMetaData = {
    mode: 'literal',
    highlightLinenos: [],
    maxLines: -1,
    title: '',
    collapsed: undefined,
  }

  let input: string = meta
  const lineNos: number[] = []
  const lineNoRangeRegex =
    /^\s*\{\s*((?:\d+|\d+-\d+)(?:\s*,\s*(?:\d+|\d+-\d+))*)\s*\}\s*/
  function eatLineNo(): void {
    const match = lineNoRangeRegex.exec(input)
    if (match == null) return

    input = input.slice(match[0].length)
    lineNos.push(...collectNumbers(match[1]))
  }

  const attributeRegex =
    /^\s*([a-zA-Z_]\w+)(?:\s*=\s*"([^"]*)"|\s*=\s*([\S]*))?\s*/
  function eatAttribute(): [string, string | undefined] | null {
    const match = attributeRegex.exec(input)
    if (match == null) return null

    input = input.slice(match[0].length)
    return [match[1], match[2] ?? match[3]]
  }

  while (input.length > 0) {
    const currentInputLength = input.length

    // Try to eat line nos
    eatLineNo()

    // Try to eat an attribute
    const attribute = eatAttribute()
    if (attribute != null) {
      const key = attribute[0].toLowerCase()
      const val = attribute[1]
      switch (key.toLowerCase()) {
        case 'live':
          result.mode = 'live'
          break
        case 'embed':
          result.mode = 'embed'
          break
        case 'maxlines': {
          const x = Number(val)
          if (!Number.isNaN(x) && x > 0) {
            result.maxLines = x
          }
          break
        }
        case 'title':
          if (val != null) result.title = val
          break
        case 'collapsed':
          result.collapsed = val == null ? true : !/^false$/i.test(val)
          break
        default:
          result[key] = val == null ? true : val
      }
    }

    if (currentInputLength <= input.length) break
  }

  result.highlightLinenos = Array.from(new Set(lineNos))
  return result
}
