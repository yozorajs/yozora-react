import { act, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import MermaidRenderer from '../src'

const engine = vi.hoisted(() => ({ initialize: vi.fn(), render: vi.fn() }))
vi.mock('mermaid', () => ({ default: engine }))

beforeAll(() => {
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value(this: HTMLDialogElement): void {
        this.setAttribute('open', '')
      },
    },
    close: {
      configurable: true,
      value(this: HTMLDialogElement): void {
        this.removeAttribute('open')
      },
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
  vi.stubGlobal(
    'ResizeObserver',
    class {
      public observe(): void {}
      public disconnect(): void {}
    },
  )
})

afterAll(() => {
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
  Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  vi.unstubAllGlobals()
})

beforeEach(() => {
  engine.initialize.mockReset()
  engine.render.mockReset().mockImplementation(async (id: string, code: string) => ({
    svg: `<svg xmlns="http://www.w3.org/2000/svg" id="${id}" viewBox="0 0 800 400"><text>${code}</text><a href="#target"><text>Open link</text></a></svg>`,
  }))
})

test('preview is opt-in and SSR does not create a dialog or start rendering', () => {
  const html = renderToString(<MermaidRenderer code="diagram" preview />)
  expect(html).not.toContain('<dialog')
  expect(html).not.toContain('<iframe')
  expect(engine.render).not.toHaveBeenCalled()
})

test('opens and zooms the existing SVG without a second Mermaid render', async () => {
  const view = render(<MermaidRenderer code="diagram" />)
  await view.findByText('diagram')
  expect(view.queryByRole('button', { name: 'Open diagram preview' })).toBeNull()
  view.rerender(<MermaidRenderer code="diagram" preview />)
  const open = await view.findByRole('button', { name: 'Open diagram preview' })
  expect(engine.render).toHaveBeenCalledTimes(2)
  fireEvent.click(view.getByText('diagram'))
  const dialog = view.getByRole('dialog', { name: 'Diagram preview' })
  expect(dialog).toHaveAttribute('open')
  expect(view.getByRole('button', { name: 'Close preview' })).toHaveFocus()
  const frame = view.getByTitle('Diagram preview content')
  expect(frame).toHaveAttribute('sandbox', '')
  expect(frame.getAttribute('srcdoc')).toContain('viewBox="0 0 800 400"')
  expect(document.querySelectorAll('svg[id]')).toHaveLength(1)
  fireEvent.click(view.getByRole('button', { name: 'Zoom in' }))
  expect(view.getByLabelText('Zoom level')).toHaveTextContent('125%')
  expect(frame.parentElement).toHaveStyle({
    transform: 'translate(-50%, -50%) rotate(0deg) scale(1, 1)',
  })
  expect(frame).toHaveStyle({ width: '1000px', height: '500px' })
  fireEvent.click(view.getByRole('button', { name: 'Rotate right' }))
  expect(frame.parentElement).toHaveStyle({
    transform: 'translate(-50%, -50%) rotate(90deg) scale(1, 1)',
  })
  expect(view.queryByRole('button', { name: 'Crop' })).toBeNull()
  fireEvent.click(view.getByRole('button', { name: '100%' }))
  expect(view.getByLabelText('Zoom level')).toHaveTextContent('100%')
  fireEvent.click(view.getByRole('button', { name: 'Close preview' }))
  expect(view.queryByRole('dialog')).toBeNull()
  fireEvent.click(open)
  expect(view.getByRole('dialog')).toHaveAttribute('open')
  expect(engine.render).toHaveBeenCalledTimes(2)
})

test('diagram links retain their own click behavior', async () => {
  const view = render(<MermaidRenderer code="diagram" preview />)
  await view.findByRole('button', { name: 'Open diagram preview' })
  fireEvent.click(view.getByRole('link', { name: 'Open link' }))
  expect(view.queryByRole('dialog')).toBeNull()
})

test('StrictMode replay keeps the dialog open; cancel and unmount clean it up', async () => {
  const view = render(<MermaidRenderer code="diagram" preview />, { wrapper: React.StrictMode })
  fireEvent.click(await view.findByRole('button', { name: 'Open diagram preview' }))
  let dialog = view.getByRole('dialog')
  fireEvent(dialog, new Event('close'))
  expect(dialog).toHaveAttribute('open')
  fireEvent(dialog, new Event('cancel', { cancelable: true }))
  expect(view.queryByRole('dialog')).toBeNull()
  fireEvent.click(view.getByRole('button', { name: 'Open diagram preview' }))
  dialog = view.getByRole('dialog')
  view.unmount()
  expect(dialog).not.toHaveAttribute('open')
  expect(document.querySelector('dialog')).toBeNull()
})

test('an open preview retains its snapshot while the source changes', async () => {
  const view = render(<MermaidRenderer code="original" preview />)
  const originalTrigger = await view.findByRole('button', { name: 'Open diagram preview' })
  fireEvent.click(originalTrigger)
  const frame = view.getByTitle('Diagram preview content')
  const snapshot = frame.getAttribute('srcdoc')
  view.rerender(<MermaidRenderer code="updated" preview />)
  await waitFor(() => expect(view.getByText('updated')).toBeInTheDocument())
  expect(frame).toHaveAttribute('srcdoc', snapshot!)
  const currentTrigger = view.getByRole('button', { name: 'Open diagram preview' })
  expect(currentTrigger).not.toBe(originalTrigger)
  fireEvent.click(view.getByRole('button', { name: 'Close preview' }))
  expect(currentTrigger).toHaveFocus()
  fireEvent.click(view.getByRole('button', { name: 'Open diagram preview' }))
  expect(view.getByTitle('Diagram preview content').getAttribute('srcdoc')).toContain('updated')
  await act(async () => {})
})

test('closing during a source update restores focus to the diagram container', async () => {
  const view = render(<MermaidRenderer code="original" preview />)
  fireEvent.click(await view.findByRole('button', { name: 'Open diagram preview' }))
  let complete: ((result: { svg: string }) => void) | undefined
  engine.render.mockImplementationOnce(
    () =>
      new Promise(resolve => {
        complete = resolve
      }),
  )
  view.rerender(<MermaidRenderer code="pending" preview />)
  await waitFor(() => expect(complete).toBeDefined())
  expect(view.queryByRole('button', { name: 'Open diagram preview' })).toBeNull()
  fireEvent(view.getByRole('dialog'), new Event('cancel', { cancelable: true }))
  expect(
    view.container.querySelector('.yozora-mermaid-preview-host > [tabindex="-1"]'),
  ).toHaveFocus()
  await act(async () => {
    complete!({ svg: '<svg viewBox="0 0 800 400"><text>pending</text></svg>' })
  })
})
