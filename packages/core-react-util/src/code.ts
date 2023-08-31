import { collectNumbers } from '@guanghechen/parse-lineno'
import type { ICodeMetaData } from '@yozora/core-react-types'

const lineNoRangeRegex = /\s*\{\s*((?:\d+|\d+-\d+)(?:\s*,\s*(?:\d+|\d+-\d+))*)\s*\}\s*/
const attributeRegex = /\s*([a-zA-Z_]\w+)(?:\s*=\s*"([^"]*)"|=([\S]*))?\s*/

export interface IParseCodeMetaOptions {
  /**
   * Display linenos in default.
   */
  showCodeLineno: boolean
}

export function parseCodeMeta(
  infoString: string | undefined,
  options: IParseCodeMetaOptions,
): ICodeMetaData {
  const result: ICodeMetaData = {
    highlights: [],
    maxlines: -1,
    title: '',
    collapsed: undefined,
    showlineno: options.showCodeLineno,
  }

  if (!infoString) return result

  let _highlightText = ''
  const remainText = infoString.replace(
    new RegExp(lineNoRangeRegex, 'g'),
    (_m: string, p1: string): string => {
      _highlightText += ' ' + p1
      return ' '
    },
  )
  const highlightsSet: Set<number> = new Set(collectNumbers(_highlightText))

  const regex = new RegExp(attributeRegex, 'g')
  for (let m: RegExpExecArray | null; ; ) {
    m = regex.exec(remainText)
    if (m === null) break

    const key: Lowercase<string> = m[1].toLowerCase() as Lowercase<string>
    const val: string | undefined = m[2] ?? m[3]
    switch (key) {
      case 'collapsed':
        result.collapsed = convertToBoolean(val)
        break
      case 'highlight':
      case 'highlights': {
        if (val === undefined) break

        const linenos: number[] = collectNumbers(val).filter(x => x > 0)
        if (linenos.length <= 0) break
        for (const x of linenos) highlightsSet.add(x)
        break
      }
      case 'maxlines': {
        const x = Number(val)
        if (!Number.isNaN(x) && x > 0) {
          result.maxlines = x
        }
        break
      }
      case 'lineno':
      case 'linenos':
      case 'showlineno':
      case 'showlinenos':
        result.showlineno = convertToBoolean(val)
        break
      case 'title':
        result.title = val ?? ''
        break
      default:
        result[key] = val ?? true
    }
  }

  result.highlights = Array.from(highlightsSet).sort((x, y) => x - y)
  return result
}

/**
 * Convert string to boolean
 * @param val
 * @returns
 */
export function convertToBoolean(val: string | undefined): boolean {
  if (val === undefined) return true
  return val.toLowerCase() !== 'false'
}
