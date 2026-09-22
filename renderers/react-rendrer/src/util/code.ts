import { collectIntervals } from '@guanghechen/string'
import type { ICodeMetaData } from '../types/code'

const lineNoRangeRegex = /\s*\{\s*((?:\d+|\d+-\d+)(?:\s*,\s*(?:\d+|\d+-\d+))*)\s*\}\s*/
const attributeRegex = /\s*([a-zA-Z_]\w+)(?:\s*=\s*"([^"]*)"|=([\S]*))?\s*/

export interface IParseCodeMetaOptions {
  /**
   * Actual number of code lines. Must be a non-negative safe integer.
   */
  lineCount: number
  /**
   * Display linenos in default.
   */
  showCodeLineno: boolean
}

export function parseCodeMeta(
  infoString: string | undefined,
  options: IParseCodeMetaOptions,
): ICodeMetaData {
  if (!Number.isSafeInteger(options.lineCount) || options.lineCount < 0) {
    throw new RangeError('lineCount must be a non-negative safe integer')
  }

  const result: ICodeMetaData = {
    highlights: [],
    maxlines: -1,
    title: '',
    collapsed: undefined,
    showlineno: options.showCodeLineno,
  }

  if (!infoString) return result

  const highlightTexts: string[] = []
  const remainText = infoString.replace(
    new RegExp(lineNoRangeRegex, 'g'),
    (_m: string, p1: string): string => {
      highlightTexts.push(p1)
      return ' '
    },
  )

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

        highlightTexts.push(val)
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

  result.highlights = collectHighlightLinenos(highlightTexts.join(' '), options.lineCount)
  return result
}

export function countCodeLines(code: string): number {
  let count = 1
  for (let i = 0; i < code.length; ++i) {
    const char = code.charCodeAt(i)
    if (char === 13) {
      ++count
      if (code.charCodeAt(i + 1) === 10) ++i
    } else if (char === 10) {
      ++count
    }
  }
  return count
}

function collectHighlightLinenos(text: string, lineCount: number): number[] {
  if (lineCount === 0) return []

  // Reject unsafe endpoints before merging so they cannot swallow valid ranges.
  const ranges = text.split(/[,\s]+/).filter(range => {
    const match = /^(\d+)(?:-(\d+))?$/.exec(range)
    return (
      match !== null &&
      Number.isSafeInteger(Number(match[1])) &&
      (match[2] === undefined || Number.isSafeInteger(Number(match[2])))
    )
  })

  const result: number[] = []
  for (const [start, end] of collectIntervals(ranges.join(' '))) {
    if (start > lineCount) break
    const lastLine = Math.min(end, lineCount)
    for (let line = Math.max(1, start); line <= lastLine; ++line) {
      result.push(line)
    }
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
  return val.toLowerCase() !== 'false'
}
