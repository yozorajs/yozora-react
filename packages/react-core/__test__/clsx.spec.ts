import type { ClassValue, IClassDictionary } from '../src'
import { clsx } from '../src'

describe('clsx', () => {
  test('joins strings and nonzero numbers in input order', () => {
    expect(clsx('button', 2, 'active', -3)).toBe('button 2 active -3')
    expect(clsx('single')).toBe('single')
  })

  test('ignores falsy values and booleans without leaving separators', () => {
    expect(clsx()).toBe('')
    expect(clsx('', 0, -0, NaN, false, true, null, undefined)).toBe('')
    expect(clsx(false, 'a', '', true, 0, 'b', null)).toBe('a b')
  })

  test('preserves duplicates, whitespace, and Tailwind class names', () => {
    expect(clsx('a', 'a', ' b\tc ', 'yz:hover:bg-[#fff]')).toBe('a a  b\tc  yz:hover:bg-[#fff]')
  })

  test('flattens mixed nested arrays and accepts frozen readonly inputs', () => {
    const flags = Object.freeze({ active: true, disabled: false })
    const nested = Object.freeze(['rounded', Object.freeze([null, flags])] as const)
    const values: readonly ClassValue[] = Object.freeze(['button', nested, [], undefined])
    expect(clsx(values, 'last')).toBe('button rounded active last')
    expect(values[1]).toBe(nested)
    expect(clsx([[], [false, [null]], []])).toBe('')
  })

  test('includes only own enumerable nonempty object keys with truthy values', () => {
    const flags: IClassDictionary = Object.assign(Object.create({ inherited: true }), {
      active: 1,
      disabled: 0,
      pending: null,
      hidden: undefined,
      selected: [],
      ready: {},
      '': true,
      [Symbol('symbol')]: true,
    })
    Object.defineProperty(flags, 'nonenumerable', { value: true })
    expect(clsx('first', flags, 'last')).toBe('first active selected ready last')
    expect(clsx({ '': true }, {})).toBe('')
  })

  test('supports null prototypes and shadowed object methods', () => {
    const flags: IClassDictionary = Object.assign(Object.create(null), {
      hasOwnProperty: true,
      toString: false,
      constructor: true,
    })
    expect(clsx(flags)).toBe('hasOwnProperty constructor')
  })

  test('never reads inherited getters', () => {
    const flags: IClassDictionary = Object.assign(
      Object.create({
        get inherited(): never {
          throw new Error('Inherited getters must not run')
        },
      }),
      { active: true },
    )
    expect(clsx(flags)).toBe('active')
  })

  test('ignores keys deleted by an earlier getter even when the prototype supplies them', () => {
    const flags = Object.assign(Object.create({ later: true }), { first: true, later: true })
    Object.defineProperty(flags, 'first', {
      enumerable: true,
      get: () => {
        delete flags.later
        return true
      },
    })
    expect(clsx('start', flags, 'end')).toBe('start first end')
  })

  test('handles large nested arrays without argument spreading', () => {
    const values = Array.from({ length: 150_000 }, (_, i) => (i % 30_000 === 0 ? 'a' : false))
    expect(clsx('first', values, 'last')).toBe('first a a a a a last')
  })
})
