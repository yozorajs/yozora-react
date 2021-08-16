import { convertToBoolean, parseCodeMeta } from '@yozora/react-code'

describe('parseCodeMeta', function () {
  test('basic', function () {
    expect(parseCodeMeta(`{1-2,2-3} live collapsed`)).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3,7,9-10,3-2} embed collapsed=false maxlines=10`),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3, 7, 9, 10],
      maxlines: 10,
      title: '',
      collapsed: false,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" title="waw"`),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: 'waw',
      collapsed: false,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" maxlines="10" title`),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: 10,
      title: '',
      collapsed: false,
    })
  })

  test('edge conditions', function () {
    expect(parseCodeMeta(`{1-2,2-3} highlights="2,4-5"`)).toEqual({
      _yozoraCodeMode: 'literal',
      highlights: [1, 2, 3, 4, 5],
      maxlines: -1,
      title: '',
      collapsed: undefined,
    })

    expect(parseCodeMeta(`live _yozoraCodeMode="embed"`)).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [],
      maxlines: -1,
      title: '',
      collapsed: undefined,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} embed highlights _yozoraCodeMode maxlines="a"`),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: undefined,
    })

    expect(
      parseCodeMeta(
        `{1-2,2-3} embed highlights= highlights=20 highlights="" highlights=30 highlights="40" _yozoraCodeMode`,
      ),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3, 20, 30, 40],
      maxlines: -1,
      title: '',
      collapsed: undefined,
    })
  })

  test('additional properties', function () {
    expect(
      parseCodeMeta(`live sourcefile="./waw.ts" hidden maxlines=20`),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [],
      maxlines: 20,
      title: '',
      collapsed: undefined,
      sourcefile: './waw.ts',
      hidden: true,
    })
  })

  test('convertToBoolean', function () {
    expect(convertToBoolean(undefined)).toBe(true)
    expect(convertToBoolean('')).toBe(true)
    expect(convertToBoolean('true')).toBe(true)
    expect(convertToBoolean('false')).toBe(false)
    expect(convertToBoolean('FALSE')).toBe(false)
  })
})
