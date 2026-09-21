import { act, render, waitFor } from '@testing-library/react'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import type { IMermaidPalette } from '../src'
import MermaidRenderer from '../src'

interface IRenderResult {
  svg: string
  bindFunctions?(element: Element): void
}

const engine = vi.hoisted(() => ({
  initialize: vi.fn(),
  render: vi.fn<(id: string, code: string, host: Element) => Promise<IRenderResult>>(),
}))
vi.mock('mermaid', () => ({ default: engine }))

const palette: IMermaidPalette = {
  node: '#303446',
  border: '#51576d',
  text: '#c6d0f5',
  line: '#a5adce',
  surface: '#292c3c',
  group: '#414559',
}

beforeEach(() => {
  engine.initialize.mockReset()
  engine.render.mockReset().mockImplementation(async (id, code) => ({
    svg: `<svg id="${id}"><text>${code}</text></svg>`,
  }))
})

test('supports SSR and hydration without loading Mermaid during server rendering', async () => {
  const element = <MermaidRenderer code="graph TD; A-->B" />
  const container = document.createElement('div')
  container.innerHTML = renderToString(element)
  document.body.appendChild(container)
  const original = container.firstElementChild
  expect(original).toHaveClass('yozora-code-renderer-mermaid')
  expect(original).toBeEmptyDOMElement()
  expect(engine.initialize).not.toHaveBeenCalled()
  expect(engine.render).not.toHaveBeenCalled()
  const onRecoverableError = vi.fn()
  let root: ReturnType<typeof hydrateRoot> | undefined
  try {
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    expect(container.firstElementChild).toBe(original)
    expect(onRecoverableError).not.toHaveBeenCalled()
  } finally {
    await act(async () => root?.unmount())
    container.remove()
  }
})

test('renders SVG, binds interactions, and removes temporary layout nodes', async () => {
  const bindFunctions = vi.fn()
  const onError = vi.fn()
  engine.render.mockResolvedValueOnce({ svg: '<svg><text>Diagram</text></svg>', bindFunctions })
  const view = render(
    <MermaidRenderer
      code="graph TD; A-->B"
      className="custom"
      style={{ width: 400 }}
      onError={onError}
    />,
  )
  await waitFor(() => expect(onError).toHaveBeenCalledWith(null))
  const host = view.container.firstElementChild!
  expect(host).toHaveClass('yozora-code-renderer-mermaid', 'custom')
  expect(host).toHaveStyle({ width: '400px' })
  expect(host.querySelector('svg')).not.toBeNull()
  expect(bindFunctions).toHaveBeenCalledWith(host)
  expect(engine.initialize).toHaveBeenCalledWith(
    expect.objectContaining({
      startOnLoad: false,
      securityLevel: 'strict',
      suppressErrorRendering: true,
      theme: 'default',
    }),
  )
  expect(engine.render.mock.calls[0][2].isConnected).toBe(false)
})

test('serializes configurations for separate diagrams and uses distinct SVG ids', async () => {
  const first = Promise.withResolvers<IRenderResult>()
  engine.render.mockReturnValueOnce(first.promise)
  const view = render(
    <>
      <MermaidRenderer code="first" theme="dark" />
      <MermaidRenderer code="second" theme="forest" />
    </>,
  )
  await waitFor(() => expect(engine.render).toHaveBeenCalledOnce())
  expect(engine.initialize).toHaveBeenCalledTimes(1)
  expect(engine.initialize.mock.calls[0][0].theme).toBe('dark')
  await act(async () => first.resolve({ svg: '<svg><text>first</text></svg>' }))
  await waitFor(() => expect(view.container.querySelectorAll('svg')).toHaveLength(2))
  expect(engine.initialize.mock.calls[1][0].theme).toBe('forest')
  expect(engine.render.mock.calls[0][0]).not.toBe(engine.render.mock.calls[1][0])
})

test('serializes rendering across independently loaded module copies', async () => {
  vi.resetModules()
  const { MermaidRenderer: First } = await import('../src')
  vi.resetModules()
  const { MermaidRenderer: Second } = await import('../src')
  const first = Promise.withResolvers<IRenderResult>()
  engine.render.mockReturnValueOnce(first.promise)
  const view = render(
    <>
      <First code="first" theme="dark" />
      <Second code="second" theme="forest" />
    </>,
  )
  await waitFor(() => expect(engine.render).toHaveBeenCalled())
  await act(async () => {})
  const concurrentRenders = engine.render.mock.calls.length
  const concurrentConfigurations = engine.initialize.mock.calls.length
  await act(async () => first.resolve({ svg: '<svg><text>first</text></svg>' }))
  await waitFor(() => expect(view.container.querySelectorAll('svg')).toHaveLength(2))
  expect(concurrentRenders).toBe(1)
  expect(concurrentConfigurations).toBe(1)
  expect(engine.initialize.mock.calls.map(call => call[0].theme)).toEqual(['dark', 'forest'])
  expect(engine.render.mock.calls[0][0]).not.toBe(engine.render.mock.calls[1][0])
})

test.each(['resolve', 'reject'] as const)(
  'ignores stale %s and skips superseded requests while retaining the latest code',
  async outcome => {
    const first = Promise.withResolvers<IRenderResult>()
    const onError = vi.fn()
    const bindFunctions = vi.fn()
    engine.render.mockReturnValueOnce(first.promise)
    const view = render(<MermaidRenderer code="old" onError={onError} />)
    await waitFor(() => expect(engine.render).toHaveBeenCalledOnce())
    view.rerender(<MermaidRenderer code="intermediate" onError={onError} />)
    view.rerender(<MermaidRenderer code="latest" onError={onError} />)
    await act(async () => {
      if (outcome === 'resolve') first.resolve({ svg: '<svg>old</svg>', bindFunctions })
      else first.reject(new Error('obsolete failure'))
    })
    await waitFor(() => expect(view.container).toHaveTextContent('latest'))
    expect(engine.render.mock.calls.map(call => call[1])).toEqual(['old', 'latest'])
    expect(bindFunctions).not.toHaveBeenCalled()
    expect(onError.mock.calls).toEqual([[null]])
  },
)

test('recovers after a syntax error and clears the reported error on success', async () => {
  const onError = vi.fn()
  engine.render.mockRejectedValueOnce(new Error('Invalid diagram'))
  const view = render(<MermaidRenderer code="invalid" onError={onError} />)
  await waitFor(() => expect(onError).toHaveBeenCalledWith('Invalid diagram'))
  expect(view.container.firstElementChild).toBeEmptyDOMElement()
  expect(engine.render.mock.calls[0][2].isConnected).toBe(false)
  view.rerender(<MermaidRenderer code="corrected" onError={onError} />)
  await waitFor(() => expect(view.container).toHaveTextContent('corrected'))
  expect(onError.mock.calls).toEqual([['Invalid diagram'], [null]])
})

test('reports interaction binding failures and allows subsequent renders', async () => {
  const onError = vi.fn()
  engine.render.mockResolvedValueOnce({
    svg: '<svg />',
    bindFunctions() {
      throw new Error('Binding failed')
    },
  })
  const view = render(<MermaidRenderer code="first" onError={onError} />)
  await waitFor(() => expect(onError).toHaveBeenCalledWith('Binding failed'))
  expect(view.container.firstElementChild).toBeEmptyDOMElement()
  expect(engine.render.mock.calls[0][2].isConnected).toBe(false)
  view.rerender(<MermaidRenderer code="second" onError={onError} />)
  await waitFor(() => expect(view.container).toHaveTextContent('second'))
  expect(onError.mock.calls).toEqual([['Binding failed'], [null]])
})

test('rerenders for a theme change, but not for callbacks or container styles', async () => {
  const onError = vi.fn()
  const view = render(<MermaidRenderer code="diagram" />)
  await waitFor(() => expect(view.container.querySelector('svg')).not.toBeNull())
  view.rerender(<MermaidRenderer code="diagram" theme="dark" onError={onError} />)
  await waitFor(() => expect(engine.render).toHaveBeenCalledTimes(2))
  expect(engine.initialize.mock.calls[1][0].theme).toBe('dark')
  view.rerender(
    <MermaidRenderer code="diagram" theme="dark" className="updated" onError={vi.fn()} />,
  )
  await act(async () => {})
  expect(engine.render).toHaveBeenCalledTimes(2)
  expect(view.container.firstElementChild).toHaveClass('updated')
})

test('uses the latest error callback without restarting an in-flight render', async () => {
  const first = Promise.withResolvers<IRenderResult>()
  const previous = vi.fn()
  const current = vi.fn()
  engine.render.mockReturnValueOnce(first.promise)
  const view = render(<MermaidRenderer code="diagram" onError={previous} />)
  await waitFor(() => expect(engine.render).toHaveBeenCalledOnce())
  view.rerender(<MermaidRenderer code="diagram" onError={current} />)
  await act(async () => first.resolve({ svg: '<svg />' }))
  expect(previous).not.toHaveBeenCalled()
  expect(current).toHaveBeenCalledWith(null)
  expect(engine.render).toHaveBeenCalledOnce()
})

test('updates palette colors within the same theme without rerendering equivalent palettes', async () => {
  const view = render(<MermaidRenderer code="diagram" theme="dark" palette={palette} />)
  await waitFor(() => expect(view.container.querySelector('svg')).not.toBeNull())
  expect(engine.initialize.mock.calls[0][0].themeVariables).toEqual(
    expect.objectContaining({
      mainBkg: palette.node,
      nodeBorder: palette.border,
      nodeTextColor: palette.text,
      lineColor: palette.line,
      edgeLabelBackground: palette.surface,
      clusterBkg: palette.group,
      actorBkg: palette.node,
      signalColor: palette.line,
    }),
  )
  view.rerender(<MermaidRenderer code="diagram" theme="dark" palette={{ ...palette }} />)
  await act(async () => {})
  expect(engine.render).toHaveBeenCalledOnce()

  const next = { ...palette, node: '#282828', line: '#d5c4a1' }
  view.rerender(<MermaidRenderer code="diagram" theme="dark" palette={next} />)
  await waitFor(() => expect(engine.render).toHaveBeenCalledTimes(2))
  expect(engine.initialize.mock.calls[1][0].themeVariables).toEqual(
    expect.objectContaining({ mainBkg: next.node, lineColor: next.line }),
  )

  view.rerender(<MermaidRenderer code="diagram" theme="dark" />)
  await waitFor(() => expect(engine.render).toHaveBeenCalledTimes(3))
  expect(engine.initialize.mock.calls[2][0].themeVariables.mainBkg).not.toBe(next.node)
})

test('discards an in-flight result when only the palette changes', async () => {
  const first = Promise.withResolvers<IRenderResult>()
  const onError = vi.fn()
  const bindFunctions = vi.fn()
  engine.render.mockReturnValueOnce(first.promise)
  const view = render(<MermaidRenderer code="diagram" palette={palette} onError={onError} />)
  await waitFor(() => expect(engine.render).toHaveBeenCalledOnce())
  const next = { ...palette, node: '#fbf1c7' }
  view.rerender(<MermaidRenderer code="diagram" palette={next} onError={onError} />)
  await act(async () => first.resolve({ svg: '<svg>obsolete</svg>', bindFunctions }))
  await waitFor(() => expect(view.container).toHaveTextContent('diagram'))
  expect(view.container).not.toHaveTextContent('obsolete')
  expect(bindFunctions).not.toHaveBeenCalled()
  expect(onError.mock.calls).toEqual([[null]])
  expect(engine.initialize.mock.calls[1][0].themeVariables.mainBkg).toBe(next.node)
})

test.each(['resolve', 'reject'] as const)(
  'ignores %s after unmount and removes temporary DOM',
  async outcome => {
    const first = Promise.withResolvers<IRenderResult>()
    const onError = vi.fn()
    const bindFunctions = vi.fn()
    engine.render.mockReturnValueOnce(first.promise)
    const view = render(<MermaidRenderer code="diagram" onError={onError} />)
    await waitFor(() => expect(engine.render).toHaveBeenCalledOnce())
    const scratch = engine.render.mock.calls[0][2]
    expect(scratch.isConnected).toBe(true)
    view.unmount()
    expect(scratch.isConnected).toBe(false)
    await act(async () => {
      if (outcome === 'resolve') first.resolve({ svg: '<svg />', bindFunctions })
      else first.reject(new Error('Unmounted'))
    })
    expect(bindFunctions).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
    expect(view.container).toBeEmptyDOMElement()
  },
)

test('survives StrictMode effect replay without rendering cancelled work', async () => {
  const onError = vi.fn()
  const view = render(<MermaidRenderer code="diagram" onError={onError} />, {
    wrapper: React.StrictMode,
  })
  await waitFor(() => expect(view.container.querySelectorAll('svg')).toHaveLength(1))
  expect(engine.render).toHaveBeenCalledOnce()
  expect(onError.mock.calls).toEqual([[null]])
})
