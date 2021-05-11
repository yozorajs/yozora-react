/**
 * @param func
 * @param wait
 * @param immediate   execute immediate
 */
type DebounceFunc = (...args: any[]) => void
export function debounce<T extends DebounceFunc = DebounceFunc>(
  func: T,
  wait: number,
  immediate = false,
): T {
  let timeout: number | null = null
  return function (...args: unknown[]): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (timeout != null) clearTimeout(timeout)
    timeout = (setTimeout(function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait) as unknown) as number

    if (immediate && timeout == null) {
      func.apply(context, args)
    }
  } as T
}
