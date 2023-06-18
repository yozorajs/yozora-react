import { TokenNames } from './TokenNames'

type ICssVariable = `var(--${string})`

export const tokens: Record<keyof typeof TokenNames, ICssVariable> = buildObjectFromEntries(
  Object.entries(TokenNames).filter(entry => Number.isNaN(Number(entry[0]))),
  (val): ICssVariable => `var(${val})`,
)

function buildObjectFromEntries<K extends string, V1, V2 = V1>(
  entries: Iterable<[key: K, val: V1]>,
  transform: (val: V1) => V2,
): Record<K, V2> {
  const result: Record<K, V2> = {} as unknown as Record<K, V2>
  for (const [key, val] of entries) {
    result[key] = transform(val)
  }
  return result
}
