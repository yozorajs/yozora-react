import type { CodeMetaData } from './types'

/**
 * Parser code meta.
 * @param meta
 * @returns
 */
export function parseCodeMeta(meta: string): CodeMetaData {
  let mode: CodeMetaData['mode'] = 'literal'
  let maxLines = -1
  let title = ''
  let input: string = meta
  let collapsed: boolean | undefined = undefined
  const lineNos: number[] = []

  const lineNoRangeRegex =
    /^\s*\{\s*((?:\d+|\d+-\d+)(?:\s*,\s*(?:\d+|\d+-\d+))*)\s*\}\s*/
  function eatLineNo(): void {
    const match = lineNoRangeRegex.exec(input)
    if (match == null) return

    input = input.slice(match[0].length)
    const rangeString = match[1].split(/\s*,\s*/g)
    for (const s of rangeString) {
      const [, lft, rht] = /(\d+)(?:-(\d+))?/.exec(s)!

      // A single number.
      if (rht == null) lineNos.push(Number(lft))

      // A number range.
      let x = Number(lft),
        y = Number(rht)
      if (x > y) {
        const t = x
        x = y
        y = t
      }

      for (let i = x; i <= y; ++i) lineNos.push(i)
    }
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
      const [key, val] = attribute
      switch (key.toLowerCase()) {
        case 'live':
          mode = 'live'
          break
        case 'embed':
          mode = 'embed'
          break
        case 'maxlines': {
          const x = Number(val)
          if (!Number.isNaN(x) && x > 0) {
            maxLines = x
          }
          break
        }
        case 'title':
          title = val ?? title
          break
        case 'collapsed':
          collapsed = val == null || !/^false$/i.test(val)
          break
      }
    }

    if (currentInputLength <= input.length) break
  }

  return {
    mode,
    maxLines,
    highlightLinenos: Array.from(new Set(lineNos)),
    title,
    collapsed,
  }
}
