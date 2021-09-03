import { collectNumbers } from '@guanghechen/parse-lineno'
import type { CodeMetaData } from './types'

const lineNoRangeRegex =
  /\s*\{\s*((?:\d+|\d+-\d+)(?:\s*,\s*(?:\d+|\d+-\d+))*)\s*\}\s*/
const attributeRegex = /\s*([a-zA-Z_]\w+)(?:\s*=\s*"([^"]*)"|=([\S]*))?\s*/

export function parseCodeMeta(infoString: string): CodeMetaData {
  let _highlightText = ''
  const remainText = infoString.replace(
    new RegExp(lineNoRangeRegex, 'g'),
    (_m: string, p1: string): string => {
      _highlightText += ' ' + p1
      return ' '
    },
  )

  const highlights: number[] = collectNumbers(_highlightText)
  const result: CodeMetaData = {
    _yozoraCodeMode: 'literal',
    highlights,
    maxlines: -1,
    title: '',
    collapsed: undefined,
    showLinenos: true,
  }

  let highlightsSet: Set<number> | null = null
  const regex = new RegExp(attributeRegex, 'g')
  for (let m: RegExpExecArray | null; ; ) {
    m = regex.exec(remainText)
    if (m === null) break

    const key: string = m[1]
    const val: string | undefined = m[2] ?? m[3]
    switch (key.toLowerCase()) {
      case 'embed':
        result._yozoraCodeMode = 'embed'
        break
      case 'literal':
        result._yozoraCodeMode = 'literal'
        break
      case 'live':
        result._yozoraCodeMode = 'live'
        break
      case 'rendermode':
        result.renderMode = val
        break
      case '_yozoracodemode': {
        if (val === undefined) break
        result._yozoraCodeMode = val
        break
      }
      case 'highlights': {
        if (val === undefined) break

        const linenos: number[] = collectNumbers(val).filter(x => x > 0)
        if (linenos.length <= 0) break

        if (highlightsSet === null) highlightsSet = new Set(highlights)
        for (const x of linenos) highlightsSet.add(x)
        break
      }
      case 'collapsed':
        result.collapsed = convertToBoolean(val)
        break
      case 'showlinenos':
      case 'linenos':
        result.showLinenos = convertToBoolean(val)
        break
      case 'maxlines': {
        const x = Number(val)
        if (!Number.isNaN(x) && x > 0) {
          result.maxlines = x
        }
        break
      }
      case 'title': {
        if (val === undefined) break
        result.title = val
        break
      }
      default:
        console.log('fallback. key:', key, 'val:', val)
        result[key] = val === undefined ? true : val
    }
  }

  if (highlightsSet !== null && highlightsSet.size > highlights.length) {
    result.highlights = [...highlightsSet].sort((x, y) => x - y)
  }

  return result
}

/**
 * Convert string to boolean
 * @param val
 * @returns
 */
export function convertToBoolean(val: string | undefined): boolean {
  if (val === undefined) return true
  return /^false$/i.test(val) === false
}
