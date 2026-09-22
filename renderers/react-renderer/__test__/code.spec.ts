import { spawnSync } from 'node:child_process'
import { URL as NodeURL } from 'node:url'
import { convertToBoolean, countCodeLines, parseCodeMeta } from '../src'

describe('parseCodeMeta', () => {
  test('bounds highlight expansion and rejects unsafe endpoints', () => {
    // A parent-enforced timeout also catches synchronous hangs in numeric expansion.
    const sourceUrl = new NodeURL('../src/util/code.ts', import.meta.url).href
    const script = `
      import assert from 'node:assert/strict'
      import { parseCodeMeta } from ${JSON.stringify(sourceUrl)}

      const parse = (text, lineCount = 40) => parseCodeMeta(text, { lineCount, showCodeLineno: true }).highlights
      const formats = [text => '{' + text + '}', text => 'highlight="' + text + '"', text => 'highlights="' + text + '"']
      const max = Number.MAX_SAFE_INTEGER
      const cases = [
        ['9007199254740992', []],
        ['9'.repeat(400), []],
        ['1-9007199254740992', []],
        ['9007199254740992-1', []],
        ['2-4,1-9007199254740992,7', [2, 3, 4, 7]],
        ['0,0-2', [1, 2]],
        ['0003-0002,7', [2, 3, 7]],
        [String(max), []],
        [(max - 1) + '-' + max, []],
      ]
      for (const format of formats) {
        for (const [input, expected] of cases) {
          assert.deepEqual(parse(format(input)), expected, format(input))
        }
        for (const range of ['1-1000000000', '1000000000-1', '1-' + max]) {
          assert.deepEqual(parse(format(range)), Array.from({ length: 40 }, (_, i) => i + 1))
        }
      }

      // Clip merged ranges across all entry forms to the actual line count.
      assert.deepEqual(
        parse('{20001-28000} highlights="1-8000" highlight="2-7999" {20001-24000}', 22000),
        [...Array.from({ length: 8000 }, (_, i) => i + 1), ...Array.from({ length: 2000 }, (_, i) => i + 20001)],
      )
      assert.deepEqual(parse('highlights="NaN,Infinity,-1,1.5,1e3,2-3"'), [2, 3])
      assert.deepEqual(parse('{1-20000}', 20000), Array.from({ length: 20000 }, (_, i) => i + 1))
      assert.deepEqual(parse('{' + (max - 1) + '-' + max + '}', max), [max - 1, max])
      assert.deepEqual(parse('{1-1000000000}', 0), [])
      for (const lineCount of [undefined, null, NaN, Infinity, -1, 1.5, max + 1]) {
        assert.throws(() => parseCodeMeta('{1-1000000000}', { lineCount, showCodeLineno: true }), RangeError)
      }
    `
    const result = spawnSync(
      process.execPath,
      ['--max-old-space-size=128', '--input-type=module', '--eval', script],
      { encoding: 'utf8', timeout: 5_000 },
    )
    expect(result.error).toBeUndefined()
    expect(result.signal).toBeNull()
    expect(result.status, result.stderr).toBe(0)
  }, 10_000)

  test('basic', () => {
    expect(
      parseCodeMeta('{1-2,2-3} live collapsed', { lineCount: 40, showCodeLineno: false }),
    ).toEqual({
      live: true,
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
      embed: true,
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
      live: true,
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
      live: true,
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
      highlights: [1, 2, 3, 4, 5],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta('live _yozoraCodeMode="embed"', { lineCount: 40, showCodeLineno: true }),
    ).toEqual({
      live: true,
      _yozoracodemode: 'embed',
      highlights: [],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta('{1-2,2-3} embed highlights _yozoraCodeMode maxlines="a"', {
        lineCount: 40,
        showCodeLineno: true,
      }),
    ).toEqual({
      _yozoracodemode: true,
      embed: true,
      highlights: [1, 2, 3],
      maxlines: -1,
      title: '',
      collapsed: undefined,
      showlineno: true,
    })

    expect(
      parseCodeMeta(
        '{1-2,2-3} embed highlights= highlights=20 highlights="" highlights=30 highlights="40" _yozoraCodeMode',
        { lineCount: 40, showCodeLineno: true },
      ),
    ).toEqual({
      _yozoracodemode: true,
      embed: true,
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
      live: true,
      highlights: [],
      maxlines: 20,
      title: '',
      collapsed: undefined,
      sourcefile: './waw.ts',
      hidden: true,
      showlineno: true,
    })
  })

  test('convertToBoolean', () => {
    expect(convertToBoolean(undefined)).toBe(true)
    expect(convertToBoolean('')).toBe(true)
    expect(convertToBoolean('true')).toBe(true)
    expect(convertToBoolean('false')).toBe(false)
    expect(convertToBoolean('FALSE')).toBe(false)
  })
})

describe('countCodeLines', () => {
  test.each(['', 'a', '\n', '\r', '\r\n', 'a\r\nb\rc\n', '\r\r\n\n', '你好😀\n世界'])(
    'counts %j like the highlighter',
    code => {
      expect(countCodeLines(code)).toBe(code.split(/\r\n|\r|\n/).length)
    },
  )
})
