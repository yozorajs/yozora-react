import type React from 'react'

const lineHeightRegex = /^([\d.]+)([\S]*)$/

// Calculate css height.
export function calcHeight(
  lineHeight: React.CSSProperties['lineHeight'],
  countOfLines: number,
): React.CSSProperties['height'] {
  const value = Number(lineHeight)
  if (!Number.isNaN(value)) return countOfLines * value

  const m = lineHeightRegex.exec('' + lineHeight)
  if (m == null) return 0

  const [, val, unit = 'px'] = m
  return countOfLines * Number(val) + unit
}
