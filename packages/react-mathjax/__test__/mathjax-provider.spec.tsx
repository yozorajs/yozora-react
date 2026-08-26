import { render, waitFor } from '@testing-library/react'
import React from 'react'
import type { IMathJax } from '../src'
import { MathJaxContextType, MathJaxProvider } from '../src'

const { loadMathJaxMock } = vi.hoisted(() => ({
  loadMathJaxMock: vi.fn(),
}))

vi.mock('../src/util/load', () => ({
  loadMathJax: loadMathJaxMock,
  loadMathJax3: loadMathJaxMock,
}))

const DEFAULT_MATHJAX_SRC = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'

const ContextConsumer: React.FC = () => {
  const { MathJax } = React.useContext(MathJaxContextType)
  return <span>{MathJax ? 'ready' : 'missing'}</span>
}

function createMathJax(): IMathJax {
  return {
    texReset: vi.fn(),
  } as unknown as IMathJax
}

beforeEach(() => {
  loadMathJaxMock.mockReset()
})

describe('MathJaxProvider', () => {
  test('loads MathJax 4 with the default configuration', async () => {
    const mathJax = createMathJax()
    const onLoad = vi.fn()
    const onError = vi.fn()
    loadMathJaxMock.mockResolvedValue(mathJax)

    const view = render(
      <MathJaxProvider loading={<span>loading</span>} onLoad={onLoad} onError={onError}>
        <ContextConsumer />
      </MathJaxProvider>,
    )

    expect(view.getByText('loading')).toBeInTheDocument()
    await waitFor(() => expect(view.getByText('ready')).toBeInTheDocument())

    expect(loadMathJaxMock).toHaveBeenCalledWith(DEFAULT_MATHJAX_SRC, expect.any(Object))
    expect(onLoad).toHaveBeenCalledOnce()
    expect(onLoad).toHaveBeenCalledWith(mathJax)
    expect(onError).not.toHaveBeenCalled()

    view.unmount()
    await waitFor(() => expect(mathJax.texReset).toHaveBeenCalledOnce())
  })

  test('reports loading errors and renders the fallback contents', async () => {
    const error = new Error('load failed')
    const onError = vi.fn()
    loadMathJaxMock.mockRejectedValue(error)

    const view = render(
      <MathJaxProvider loading={<span>loading</span>} onError={onError}>
        <ContextConsumer />
      </MathJaxProvider>,
    )

    await waitFor(() => expect(view.getByText('missing')).toBeInTheDocument())
    expect(onError).toHaveBeenCalledOnce()
    expect(onError).toHaveBeenCalledWith(error)
  })
})
