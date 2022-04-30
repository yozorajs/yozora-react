import { convertToBoolean, parseCodeMeta } from 'packages/react-code/src'

describe('parseCodeMeta', function () {
  test('basic', function () {
    expect(parseCodeMeta(`{1-2,2-3} live collapsed`, { preferLinenos: false })).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: true,
      showLinenos: false,
    })

    expect(
      parseCodeMeta(`{1-2,2-3,7,9-10,3-2} embed collapsed=false maxlines=10`, {
        preferLinenos: true,
      }),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3, 7, 9, 10],
      maxlines: 10,
      title: '',
      collapsed: false,
      showLinenos: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" title="waw" linenos`, {
        preferLinenos: false,
      }),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: 'waw',
      collapsed: false,
      showLinenos: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" maxlines="10" title linenos=false`, {
        preferLinenos: true,
      }),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [1, 2, 3],
      maxlines: 10,
      title: '',
      collapsed: false,
      showLinenos: false,
    })
  })

  test('edge conditions', function () {
    expect(parseCodeMeta(`{1-2,2-3} highlights="2,4-5"`, { preferLinenos: true })).toEqual({
      _yozoraCodeMode: 'literal',
      highlights: [1, 2, 3, 4, 5],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showLinenos: true,
    })

    expect(parseCodeMeta(`live _yozoraCodeMode="embed"`, { preferLinenos: true })).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showLinenos: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} embed highlights _yozoraCodeMode maxlines="a"`, {
        preferLinenos: true,
      }),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showLinenos: true,
    })

    expect(
      parseCodeMeta(
        `{1-2,2-3} embed highlights= highlights=20 highlights="" highlights=30 highlights="40" _yozoraCodeMode`,
        { preferLinenos: true },
      ),
    ).toEqual({
      _yozoraCodeMode: 'embed',
      highlights: [1, 2, 3, 20, 30, 40],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showLinenos: true,
    })
  })

  test('additional properties', function () {
    expect(
      parseCodeMeta(`live sourcefile="./waw.ts" hidden maxlines=20`, {
        preferLinenos: true,
      }),
    ).toEqual({
      _yozoraCodeMode: 'live',
      highlights: [],
      maxlines: 20,
      title: '',
      collapsed: undefined,
      sourcefile: './waw.ts',
      hidden: true,
      showLinenos: true,
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
