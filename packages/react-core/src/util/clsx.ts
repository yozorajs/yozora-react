export interface IClassDictionary {
  readonly [className: string]: unknown
}

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | IClassDictionary
  | readonly ClassValue[]

// Keep the intrinsic independent of methods on input dictionaries.
const hasOwn = Object.prototype.hasOwnProperty

/**
 * Join class names, nested arrays, and conditional objects in input order.
 * Ignore falsy values and booleans. Objects contribute their own enumerable
 * nonempty string keys with truthy values. Preserve whitespace and duplicates.
 * Arrays must be acyclic; inputs are never modified.
 *
 * ```ts
 * clsx('button', ['rounded', false], { active: true }) // 'button rounded active'
 * ```
 */
export function clsx(...values: readonly ClassValue[]): string {
  let result = ''
  for (let i = 0; i < values.length; ++i) {
    const value = values[i]
    if (!value) continue

    const className = typeof value === 'string' ? value : stringifyClassValue(value)
    if (className) result = result ? result + ' ' + className : className
  }
  return result
}

function stringifyClassValue(value: ClassValue): string {
  if (typeof value === 'number') return '' + value
  if (typeof value !== 'object') return ''

  let result = ''
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; ++i) {
      const item = value[i]
      if (!item) continue

      const className = typeof item === 'string' ? item : stringifyClassValue(item)
      if (className) result = result ? result + ' ' + className : className
    }
  } else {
    const dictionary = value as IClassDictionary
    for (const className in dictionary) {
      // This intrinsic call is faster than Object.hasOwn in the measured V8 loops.
      if (className && hasOwn.call(dictionary, className) && dictionary[className]) {
        result = result ? result + ' ' + className : className
      }
    }
  }
  return result
}
