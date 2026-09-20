import { act, render, waitFor } from '@testing-library/react'
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
    expect(mathJax.texReset).not.toHaveBeenCalled()
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

  test.each(['resolve', 'reject'] as const)(
    'ignores an obsolete load that later %ss',
    async outcome => {
      let resolveOld!: (mathJax: IMathJax) => void
      let rejectOld!: (error: Error) => void
      const oldLoad = new Promise<IMathJax>((resolve, reject) => {
        resolveOld = resolve
        rejectOld = reject
      })
      const current = createMathJax()
      loadMathJaxMock.mockReturnValueOnce(oldLoad).mockResolvedValueOnce(current)
      const onLoad = vi.fn()
      const onError = vi.fn()
      const view = render(
        <MathJaxProvider mathjaxSrc="/old.js" onLoad={onLoad} onError={onError}>
          <ContextConsumer />
        </MathJaxProvider>,
      )
      view.rerender(
        <MathJaxProvider mathjaxSrc="/new.js" onLoad={onLoad} onError={onError}>
          <ContextConsumer />
        </MathJaxProvider>,
      )
      await waitFor(() => expect(onLoad).toHaveBeenCalledWith(current))
      expect(loadMathJaxMock).toHaveBeenCalledTimes(2)
      await act(async () => {
        if (outcome === 'resolve') resolveOld(createMathJax())
        else rejectOld(new Error('obsolete failure'))
      })
      expect(onLoad).toHaveBeenCalledOnce()
      expect(onError).not.toHaveBeenCalled()
      expect(view.getByText('ready')).toBeInTheDocument()
    },
  )

  test.each(['resolve', 'reject'] as const)(
    'ignores loading completion after unmount (%s)',
    async outcome => {
      let resolveLoad!: (mathJax: IMathJax) => void
      let rejectLoad!: (error: Error) => void
      loadMathJaxMock.mockReturnValue(
        new Promise<IMathJax>((resolve, reject) => {
          resolveLoad = resolve
          rejectLoad = reject
        }),
      )
      const onLoad = vi.fn()
      const onError = vi.fn()
      const mathJax = createMathJax()
      const view = render(<MathJaxProvider onLoad={onLoad} onError={onError} />)
      view.unmount()
      await act(async () => {
        if (outcome === 'resolve') resolveLoad(mathJax)
        else rejectLoad(new Error('late failure'))
      })
      expect(onLoad).not.toHaveBeenCalled()
      expect(onError).not.toHaveBeenCalled()
      expect(mathJax.texReset).not.toHaveBeenCalled()
    },
  )

  test('keeps a shared engine available when another provider unmounts', async () => {
    const mathJax = createMathJax()
    loadMathJaxMock.mockResolvedValue(mathJax)
    const first = render(
      <MathJaxProvider>
        <ContextConsumer />
      </MathJaxProvider>,
    )
    const second = render(
      <MathJaxProvider>
        <ContextConsumer />
      </MathJaxProvider>,
    )
    await waitFor(() => expect(second.container).toHaveTextContent('ready'))
    first.unmount()
    await act(async () => {})
    expect(mathJax.texReset).not.toHaveBeenCalled()
    expect(second.container).toHaveTextContent('ready')
  })

  test('reports only the current subscription under StrictMode replay', async () => {
    const mathJax = createMathJax()
    const onLoad = vi.fn()
    loadMathJaxMock.mockResolvedValue(mathJax)
    const view = render(
      <React.StrictMode>
        <MathJaxProvider onLoad={onLoad}>
          <ContextConsumer />
        </MathJaxProvider>
      </React.StrictMode>,
    )
    await waitFor(() => expect(view.getByText('ready')).toBeInTheDocument())
    expect(onLoad).toHaveBeenCalledOnce()
    expect(mathJax.texReset).not.toHaveBeenCalled()
  })

  test('returns to loading and then reports an error when configuration changes', async () => {
    const mathJax = createMathJax()
    let rejectLoad!: (error: Error) => void
    loadMathJaxMock.mockResolvedValueOnce(mathJax).mockReturnValueOnce(
      new Promise<IMathJax>((_, reject) => {
        rejectLoad = reject
      }),
    )
    const onError = vi.fn()
    const view = render(
      <MathJaxProvider mathjaxSrc="/first.js" loading={<span>loading</span>} onError={onError}>
        <ContextConsumer />
      </MathJaxProvider>,
    )
    await view.findByText('ready')
    view.rerender(
      <MathJaxProvider mathjaxSrc="/different.js" loading={<span>loading</span>} onError={onError}>
        <ContextConsumer />
      </MathJaxProvider>,
    )
    expect(view.getByText('loading')).toBeInTheDocument()
    await act(async () => rejectLoad(new Error('configuration conflict')))
    expect(view.getByText('missing')).toBeInTheDocument()
    expect(onError).toHaveBeenCalledWith(new Error('configuration conflict'))
    expect(mathJax.texReset).not.toHaveBeenCalled()
  })
})
