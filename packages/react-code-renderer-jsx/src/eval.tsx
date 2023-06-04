/**
 * Eval Jsx code
 *
 * @param code
 * @param scope
 * @see https://github.com/FormidableLabs/react-live/blob/f7ca7652a2be2c8dce6b758a92520bbb4d128c9e/packages/react-live/src/utils/transpile/evalCode.ts
 */
export function evalCode(code: string, scope: Record<string, unknown>): React.ReactElement {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])

  // eslint-disable-next-line no-new-func
  const f = new Function(...scopeKeys, code)
  return f(...scopeValues)
}
