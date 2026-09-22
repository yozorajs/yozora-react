import { parseCodeMeta } from '../src'

describe('parseCodeMeta', () => {
  test('clips shared highlights to the supplied line count and preserves code mode', () => {
    const result = parseCodeMeta('live highlights="1-1000000"', {
      lineCount: 40,
      showCodeLineno: false,
    })
    expect(result._yozoracodemode).toBe('live')
    expect(result.showlineno).toBe(false)
    expect(result.highlights).toEqual(Array.from({ length: 40 }, (_, i) => i + 1))
  })

  test('basic', () => {
    expect(
      parseCodeMeta('{1-2,2-3} live collapsed', { lineCount: 40, showCodeLineno: false }),
    ).toEqual({
      _yozoracodemode: 'live',
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: true,
      showlineno: false,
    })

    expect(
      parseCodeMeta('{1-2,2-3,7,9-10,3-2} embed collapsed=false maxlines=10', {
        lineCount: 40,
        showCodeLineno: true,
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
      parseCodeMeta('{1-2,2-3} live collapsed="false" title="waw" linenos', {
        lineCount: 40,
        showCodeLineno: false,
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
      parseCodeMeta('{1-2,2-3} live collapsed="false" maxlines="10" title linenos=false', {
        lineCount: 40,
        showCodeLineno: true,
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

  test('edge conditions', () => {
    expect(
      parseCodeMeta('{1-2,2-3} highlights="2,4-5"', { lineCount: 40, showCodeLineno: true }),
    ).toEqual({
      _yozoracodemode: 'literal',
      highlights: [1, 2, 3, 4, 5],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta('live _yozoracodemode="embed"', { lineCount: 40, showCodeLineno: true }),
    ).toEqual({
      _yozoracodemode: 'embed',
      highlights: [],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta('{1-2,2-3} embed highlights _yozoracodemode maxlines="a"', {
        lineCount: 40,
        showCodeLineno: true,
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
        '{1-2,2-3} embed highlights= highlights=20 highlights="" highlights=30 highlights="40" _yozoracodemode',
        { lineCount: 40, showCodeLineno: true },
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

  test('additional properties', () => {
    expect(
      parseCodeMeta('live sourcefile="./waw.ts" hidden maxlines=20', {
        lineCount: 40,
        showCodeLineno: true,
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
