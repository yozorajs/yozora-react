import { act, render, waitFor } from '@testing-library/react'
import React from 'react'
import type { IMathJax } from '../src'
import { MathJaxContextType, MathJaxProvider } from '../src'

const SRC = 'https://example.com/mathjax.js'
const RETRY_SRC = 'https://example.com/mathjax-retry.js'
const w = window as any

const Consumer: React.FC = () => {
  const { MathJax } = React.useContext(MathJaxContextType)
  return <span>{MathJax ? 'ready' : 'missing'}</span>
}

function getScript(src = SRC): HTMLScriptElement {
  return document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)!
}

function publishMathJax(src = SRC): IMathJax {
  const mathJax = {
    config: w.MathJax,
    startup: { promise: Promise.resolve() },
    texReset: vi.fn(),
  } as unknown as IMathJax
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
})

test('shares a real loader between providers and isolates a conflicting provider', async () => {
  const onError = vi.fn()
  const first = render(
    <MathJaxProvider mathjaxSrc={SRC}>
      <Consumer />
    </MathJaxProvider>,
  )
  const second = render(
    <MathJaxProvider mathjaxSrc={SRC}>
      <Consumer />
    </MathJaxProvider>,
  )
  expect(document.querySelectorAll('script')).toHaveLength(1)
  const mathJax = publishMathJax()
  await waitFor(() => expect(second.container).toHaveTextContent('ready'))
  const conflicting = render(
    <MathJaxProvider mathjaxSrc={SRC} mathjaxConfig={{ tex: { tags: 'none' } }} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  await waitFor(() => expect(onError).toHaveBeenCalledOnce())
  expect(onError.mock.calls[0][0].message).toContain('different URL or configuration')
  expect(conflicting.container).toHaveTextContent('missing')
  first.unmount()
  expect(second.container).toHaveTextContent('ready')
  expect(mathJax.texReset).not.toHaveBeenCalled()
  expect(w.MathJax).toBe(mathJax)
})

test('recovers a provider after a script failure and a corrected URL', async () => {
  const onLoad = vi.fn()
  const onError = vi.fn()
  const view = render(
    <MathJaxProvider mathjaxSrc={SRC} onLoad={onLoad} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  await act(async () => getScript().dispatchEvent(new Event('error')))
  expect(onError).toHaveBeenCalledOnce()
  view.rerender(
    <MathJaxProvider mathjaxSrc={RETRY_SRC} onLoad={onLoad} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  expect(getScript()).toBeNull()
  const mathJax = publishMathJax(RETRY_SRC)
  await waitFor(() => expect(view.getByText('ready')).toBeInTheDocument())
  expect(onLoad).toHaveBeenCalledOnce()
  expect(onLoad).toHaveBeenCalledWith(mathJax)
})

test('reports a conflict without waiting for the old load and ignores its later completion', async () => {
  const onLoad = vi.fn()
  const onError = vi.fn()
  const view = render(
    <MathJaxProvider mathjaxSrc={SRC} onLoad={onLoad} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  view.rerender(
    <MathJaxProvider mathjaxSrc={RETRY_SRC} onLoad={onLoad} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  await waitFor(() => expect(onError).toHaveBeenCalledOnce())
  await act(async () => {
    publishMathJax()
  })
  expect(onLoad).not.toHaveBeenCalled()
  expect(view.getByText('missing')).toBeInTheDocument()
  view.rerender(
    <MathJaxProvider mathjaxSrc={SRC} onLoad={onLoad} onError={onError}>
      <Consumer />
    </MathJaxProvider>,
  )
  await waitFor(() => expect(onLoad).toHaveBeenCalledOnce())
  expect(view.getByText('ready')).toBeInTheDocument()
  expect(document.querySelectorAll('script')).toHaveLength(1)
})

test('loads one script and notifies the active provider under StrictMode', async () => {
  const onLoad = vi.fn()
  render(
    <React.StrictMode>
      <MathJaxProvider mathjaxSrc={SRC} onLoad={onLoad}>
        <Consumer />
      </MathJaxProvider>
    </React.StrictMode>,
  )
  expect(document.querySelectorAll('script')).toHaveLength(1)
  const mathJax = publishMathJax()
  await waitFor(() => expect(onLoad).toHaveBeenCalledOnce())
  expect(mathJax.texReset).not.toHaveBeenCalled()
})

test('shares default configuration between providers from separate copies of the module', async () => {
  const onLoad = vi.fn()
  const onError = vi.fn()
  render(<MathJaxProvider mathjaxSrc={SRC} onLoad={onLoad} onError={onError} />)
  vi.resetModules()
  const { MathJaxProvider: OtherProvider } = await import('../src/MathJaxProvider')
  render(<OtherProvider mathjaxSrc={SRC} onLoad={onLoad} onError={onError} />)
  const mathJax = publishMathJax()
  await waitFor(() => expect(onLoad).toHaveBeenCalledTimes(2))
  expect(onError).not.toHaveBeenCalled()
  expect(document.querySelectorAll('script')).toHaveLength(1)
  expect(onLoad).toHaveBeenLastCalledWith(mathJax)
})
