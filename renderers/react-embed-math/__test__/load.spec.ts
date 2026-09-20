import type { IMathJax, IMathJaxConfig } from '../src/types'

const SRC = 'https://example.com/mathjax.js'
const RETRY_SRC = 'https://example.com/mathjax-retry.js'
const w = window as any

function getScript(src = SRC): HTMLScriptElement {
  return document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)!
}

function startMathJax(startup = Promise.resolve(), src = SRC): IMathJax {
  const mathJax = { config: w.MathJax, startup: { promise: startup } } as unknown as IMathJax
  w.MathJax = mathJax
  getScript(src).dispatchEvent(new Event('load'))
  return mathJax
}

afterEach(() => {
  document.querySelectorAll('script').forEach(node => {
    node.remove()
  })
  delete w.MathJax
  delete w[Symbol.for('@yozora/react-embed-math/load')]
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.resetModules()
})

test('loadMathJax resolves after MathJax startup completes', async () => {
  const { loadMathJax } = await import('../src/util/load')
  let resolveStartup!: () => void
  const startup = new Promise<void>(resolve => {
    resolveStartup = resolve
  })
  const result = loadMathJax(SRC, undefined)
  expect(getScript()).not.toBeNull()
  const mathJax = startMathJax(startup)

  let settled = false
  void result.then(() => {
    settled = true
  })
  await Promise.resolve()
  expect(settled).toBe(false)

  resolveStartup()
  await expect(result).resolves.toBe(mathJax)
})

test('shares equivalent requests without letting MathJax mutate caller config or the cache', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const tag = (value: string): string => `(${value})`
  const config: IMathJaxConfig = { tex: { tags: 'none', packages: ['base'] }, tagformat: { tag } }
  const first = loadMathJax(SRC, config)
  const runtimeConfig = w.MathJax
  expect(runtimeConfig).not.toBe(config)
  expect(runtimeConfig.tagformat.tag).toBe(tag)
  runtimeConfig.tex.packages.push('ams')
  runtimeConfig.loader = { load: [] }
  expect(config.tex.packages).toEqual(['base'])
  expect(config.loader).toBeUndefined()
  const equivalent = { tex: { tags: 'none', packages: ['base'] }, tagformat: { tag } }
  expect(loadMathJax(SRC, equivalent)).toBe(first)
  const mathJax = startMathJax()
  await expect(first).resolves.toBe(mathJax)
  expect(loadMathJax(SRC, equivalent)).toBe(first)
  expect(document.querySelectorAll('script')).toHaveLength(1)
})

test.each(['pending', 'ready'] as const)(
  'rejects URL and configuration conflicts while %s without changing the shared engine',
  async phase => {
    const { loadMathJax } = await import('../src/util/load')
    const first = loadMathJax(SRC, { tex: { tags: 'none' } })
    if (phase === 'ready') {
      startMathJax()
      await first
    }
    const original = w.MathJax
    await expect(loadMathJax(RETRY_SRC, { tex: { tags: 'none' } })).rejects.toThrow(
      'different URL or configuration',
    )
    await expect(loadMathJax(SRC, { tex: { tags: 'ams' } })).rejects.toThrow(
      'different URL or configuration',
    )
    expect(w.MathJax).toBe(original)
    expect(document.querySelectorAll('script')).toHaveLength(1)
    if (phase === 'pending') startMathJax()
    await first
    expect(loadMathJax(SRC, { tex: { tags: 'none' } })).toBe(first)
  },
)

test('detects later caller mutations using the original config snapshot', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const config = { tex: { tags: 'none' } }
  const first = loadMathJax(SRC, config)
  config.tex.tags = 'ams'
  await expect(loadMathJax(SRC, config)).rejects.toThrow('different URL or configuration')
  startMathJax()
  await first
})

test.each([SRC, RETRY_SRC])(
  'retries a script failure using %s and ignores events from the removed script',
  async retrySrc => {
    const { loadMathJax } = await import('../src/util/load')
    const first = loadMathJax(SRC, { tex: { tags: 'none' } })
    const failedScript = getScript()
    const rejected = expect(first).rejects.toThrow('Failed to load MathJax script')
    failedScript.dispatchEvent(new Event('error'))
    await rejected
    expect(failedScript.isConnected).toBe(false)
    expect(w.MathJax).toBeUndefined()

    const retry = loadMathJax(retrySrc, { tex: { tags: 'ams' } })
    const retryConfig = w.MathJax
    expect(retryConfig.tex.tags).toBe('ams')
    failedScript.dispatchEvent(new Event('load'))
    failedScript.dispatchEvent(new Event('error'))
    expect(w.MathJax).toBe(retryConfig)
    const mathJax = startMathJax(Promise.resolve(), retrySrc)
    await expect(retry).resolves.toBe(mathJax)
    expect(document.querySelectorAll('script')).toHaveLength(1)
  },
)

test('retries after startup rejects and removes only its own failed global', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const first = loadMathJax(SRC, undefined)
  const rejected = expect(first).rejects.toThrow('startup failed')
  startMathJax(Promise.reject(new Error('startup failed')))
  await rejected
  expect(w.MathJax).toBeUndefined()
  expect(getScript()).toBeNull()
  const retry = loadMathJax(RETRY_SRC, undefined)
  const mathJax = startMathJax(Promise.resolve(), RETRY_SRC)
  await expect(retry).resolves.toBe(mathJax)
})

test('retries when a loaded script does not expose MathJax startup', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const first = loadMathJax(SRC, undefined)
  getScript().dispatchEvent(new Event('load'))
  await expect(first).rejects.toThrow('without exposing a startup promise')
  expect(w.MathJax).toBeUndefined()
  const retry = loadMathJax(SRC, undefined)
  const mathJax = startMathJax()
  await expect(retry).resolves.toBe(mathJax)
})

test('releases a failed attempt when inserting the script throws', async () => {
  const { loadMathJax } = await import('../src/util/load')
  vi.spyOn(document.head, 'appendChild').mockImplementationOnce(() => {
    throw new Error('append failed')
  })
  await expect(loadMathJax(SRC, undefined)).rejects.toThrow('append failed')
  expect(w.MathJax).toBeUndefined()
  const retry = loadMathJax(SRC, undefined)
  const mathJax = startMathJax()
  await expect(retry).resolves.toBe(mathJax)
})

test('does not cache SSR results for subsequent browser calls', async () => {
  const { loadMathJax } = await import('../src/util/load')
  vi.stubGlobal('window', undefined)
  await expect(loadMathJax(SRC, undefined)).resolves.toBeNull()
  vi.unstubAllGlobals()
  const result = loadMathJax(SRC, undefined)
  const mathJax = startMathJax()
  await expect(result).resolves.toBe(mathJax)
})

test('shares page ownership across copies of the module and equivalent URLs', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const first = loadMathJax('/mathjax.js', undefined)
  vi.resetModules()
  const other = await import('../src/util/load')
  const absoluteSrc = new URL('/mathjax.js', document.baseURI).href
  expect(other.loadMathJax(absoluteSrc, {})).toBe(first)
  expect(document.querySelectorAll('script')).toHaveLength(1)
  const mathJax = startMathJax(Promise.resolve(), absoluteSrc)
  await expect(first).resolves.toBe(mathJax)
})

test('preserves globals owned by external integrations', async () => {
  const { loadMathJax } = await import('../src/util/load')
  const external = { startup: { promise: Promise.resolve() } }
  w.MathJax = external
  await expect(loadMathJax(SRC, undefined)).rejects.toThrow('outside this loader')
  expect(w.MathJax).toBe(external)
  expect(document.querySelectorAll('script')).toHaveLength(0)
})

test('does not remove a replacement global when its own startup later fails', async () => {
  const { loadMathJax } = await import('../src/util/load')
  let rejectStartup!: (error: Error) => void
  const startup = new Promise<void>((_, reject) => {
    rejectStartup = reject
  })
  const first = loadMathJax(SRC, undefined)
  startMathJax(startup)
  const external = { startup: { promise: Promise.resolve() } }
  w.MathJax = external
  rejectStartup(new Error('old failure'))
  await expect(first).rejects.toThrow('old failure')
  expect(w.MathJax).toBe(external)
})
