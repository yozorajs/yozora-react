import type { IMathJax } from '../src/types'

afterEach(() => {
  document.querySelectorAll('script[src="https://example.com/mathjax.js"]').forEach(node => {
    node.remove()
  })
  delete (window as any).MathJax
  vi.resetModules()
})

test('loadMathJax resolves after MathJax startup completes', async () => {
  const { loadMathJax } = await import('../src/util/load')
  let resolveStartup!: () => void
  const mathJax = {
    startup: {
      promise: new Promise<void>(resolve => {
        resolveStartup = resolve
      }),
    },
  } as unknown as IMathJax

  const result = loadMathJax('https://example.com/mathjax.js', undefined)
  const script = document.querySelector<HTMLScriptElement>(
    'script[src="https://example.com/mathjax.js"]',
  )
  expect(script).not.toBeNull()

  ;(window as any).MathJax = mathJax
  script!.dispatchEvent(new Event('load'))

  let settled = false
  void result.then(() => {
    settled = true
  })
  await Promise.resolve()
  expect(settled).toBe(false)

  resolveStartup()
  await expect(result).resolves.toBe(mathJax)
})
