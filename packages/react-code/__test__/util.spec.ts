import { parseCodeMeta } from '../src'

describe('parseCodeMeta', function () {
  test('basic', function () {
    expect(parseCodeMeta(`{1-2,2-3} live collapsed`, { preferLineNo: false })).toEqual({
      _yozoracodemode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: true,
      showlineno: false,
    })

    expect(
      parseCodeMeta(`{1-2,2-3,7,9-10,3-2} embed collapsed=false maxlines=10`, {
        preferLineNo: true,
      }),
    ).toEqual({
      _yozoracodemode: 'embed',
      highlights: [1, 2, 3, 7, 9, 10],
      maxlines: 10,
      title: '',
      collapsed: false,
      showlineno: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" title="waw" linenos`, {
        preferLineNo: false,
      }),
    ).toEqual({
      _yozoracodemode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: 'waw',
      collapsed: false,
      showlineno: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} live collapsed="false" maxlines="10" title linenos=false`, {
        preferLineNo: true,
      }),
    ).toEqual({
      _yozoracodemode: 'live',
      highlights: [1, 2, 3],
      maxlines: 10,
      title: '',
      collapsed: false,
      showlineno: false,
    })
  })

  test('edge conditions', function () {
    expect(parseCodeMeta(`{1-2,2-3} highlights="2,4-5"`, { preferLineNo: true })).toEqual({
      _yozoracodemode: 'literal',
      highlights: [1, 2, 3, 4, 5],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(parseCodeMeta(`live _yozoracodemode="embed"`, { preferLineNo: true })).toEqual({
      _yozoracodemode: 'embed',
      highlights: [],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta(`{1-2,2-3} embed highlights _yozoracodemode maxlines="a"`, {
        preferLineNo: true,
      }),
    ).toEqual({
      _yozoracodemode: 'embed',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta(
        `{1-2,2-3} embed highlights= highlights=20 highlights="" highlights=30 highlights="40" _yozoracodemode`,
        { preferLineNo: true },
      ),
    ).toEqual({
      _yozoracodemode: 'embed',
      highlights: [1, 2, 3, 20, 30, 40],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })
  })

  test('additional properties', function () {
    expect(
      parseCodeMeta(`live sourcefile="./waw.ts" hidden maxlines=20`, {
        preferLineNo: true,
      }),
    ).toEqual({
      _yozoracodemode: 'live',
      highlights: [],
      maxlines: 20,
      title: '',
      collapsed: undefined,
      sourcefile: './waw.ts',
      hidden: true,
      showlineno: true,
    })
  })
})