export const createCssVariables = (
  prefix: string,
  kv: Record<string, string>,
): Record<string, string> => {
  const results: Record<string, string> = {}
  for (const key of Object.keys(kv)) {
    const val = kv[key]
    results[`${prefix}-${key}`] = val
  }
  return results
}
