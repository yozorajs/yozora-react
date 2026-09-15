export const defaultSmallScreenQuery = '(max-width: 479px)'

/** Deterministic and safe in CSS selectors and SSR, without shared counters or browser APIs. */
export function getBreakpointId(query: string): string | undefined {
  if (query === defaultSmallScreenQuery) return undefined
  let id = ''
  for (let i = 0; i < query.length; ++i) {
    id += query.charCodeAt(i).toString(16).padStart(4, '0')
  }
  return 'yz-' + id
}
