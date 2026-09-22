import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ImageViewer, MediaPreview } from '../../src'

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
        if (!this.open) return
        this.removeAttribute('open')
        this.dispatchEvent(new Event('close'))
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

const images = [
  { src: '/sample.png', alt: 'Sample' },
  { src: '/second.png', alt: 'Second' },
]

function loadImage(image: HTMLElement): void {
  Object.defineProperties(image, {
    naturalWidth: { configurable: true, value: 800 },
    naturalHeight: { configurable: true, value: 600 },
  })
  fireEvent.load(image)
}

test('does not open a modal in SSR or when hidden; invalid indices are ignored', () => {
  const onClose = vi.fn()
  expect(renderToString(<ImageViewer images={images} visible={false} onClose={onClose} />)).toBe('')
  expect(
    renderToString(<ImageViewer images={images} activeIndex={4} visible onClose={onClose} />),
  ).toBe('')
  const html = renderToString(<ImageViewer images={images} visible onClose={onClose} />)
  expect(html).toContain('<dialog')
  expect(html).not.toContain('open=""')
  expect(onClose).not.toHaveBeenCalled()
})

test('crops, stretches and rotates only the preview; reset restores the whole image', () => {
  const view = render(<ImageViewer images={images} visible onClose={vi.fn()} />)
  const image = view.getByAltText('Sample')
  expect(view.getByRole('button', { name: 'Crop' })).toBeDisabled()
  loadImage(image)
  const media = image.parentElement!
  fireEvent.click(view.getByRole('button', { name: 'Crop' }))
  fireEvent.change(view.getByLabelText('Crop width'), { target: { value: '300' } })
  fireEvent.change(view.getByLabelText('Crop height'), { target: { value: '200' } })
  fireEvent.click(view.getByRole('button', { name: 'Apply crop' }))
  expect(media).toHaveStyle({ width: '300px', height: '200px' })
  expect(image).toHaveStyle({ left: '-80px', top: '-60px' })
  fireEvent.click(view.getByRole('button', { name: 'Stretch' }))
  fireEvent.change(view.getByLabelText('Stretch width'), { target: { value: '150' } })
  fireEvent.change(view.getByLabelText('Stretch height'), { target: { value: '50' } })
  fireEvent.click(view.getByRole('button', { name: 'Rotate right' }))
  expect(media.parentElement).toHaveStyle({ width: '100px', height: '450px' })
  expect(media).toHaveStyle({ transform: 'translate(-50%, -50%) rotate(90deg) scale(1.5, 0.5)' })
  fireEvent.click(view.getByRole('button', { name: 'Crop' }))
  fireEvent.change(view.getByLabelText('Crop width'), { target: { value: '700' } })
  fireEvent.click(view.getByRole('button', { name: 'Cancel crop' }))
  expect(media).toHaveStyle({ width: '300px', height: '200px' })
  fireEvent.click(view.getByRole('button', { name: 'Reset view' }))
  expect(media).toHaveStyle({
    width: '800px',
    height: '600px',
    transform: 'translate(-50%, -50%) rotate(0deg) scale(1, 1)',
  })
  expect(image).toHaveStyle({ left: '0px', top: '0px' })
  expect(image).toHaveAttribute('src', '/sample.png')
})

test('StrictMode, native close, backdrop and unmount notify only once per user action', () => {
  const onClose = vi.fn()
  const onMaskClick = vi.fn()
  const view = render(
    <ImageViewer images={images} visible onClose={onClose} onMaskClick={onMaskClick} />,
    { wrapper: React.StrictMode },
  )
  const dialog = view.getByRole('dialog')
  expect(dialog).toHaveAttribute('open')
  expect(onClose).not.toHaveBeenCalled()
  fireEvent.click(dialog)
  expect(onMaskClick).toHaveBeenCalledTimes(1)
  expect(onClose).not.toHaveBeenCalled()
  view.unmount()
  expect(onClose).not.toHaveBeenCalled()

  const second = render(<ImageViewer images={images} visible onClose={onClose} />)
  fireEvent.click(second.getByRole('button', { name: 'Close preview' }))
  expect(onClose).toHaveBeenCalledTimes(1)
  second.unmount()
  expect(onClose).toHaveBeenCalledTimes(1)
  const third = render(<ImageViewer images={images} visible onClose={onClose} />)
  ;(third.getByRole('dialog') as HTMLDialogElement).close()
  expect(onClose).toHaveBeenCalledTimes(2)
})

test('a failed image can be closed; selecting another image resets failure and edits', () => {
  const onClose = vi.fn()
  const view = render(<ImageViewer images={images} visible onClose={onClose} />)
  fireEvent.error(view.getByAltText('Sample'))
  expect(view.getByRole('alert')).toHaveTextContent('Unable to load image.')
  expect(view.getByRole('button', { name: 'Rotate right' })).toBeDisabled()
  view.rerender(<ImageViewer images={images} activeIndex={1} visible onClose={onClose} />)
  loadImage(view.getByAltText('Second'))
  expect(view.queryByRole('alert')).toBeNull()
  expect(view.getByRole('button', { name: 'Rotate right' })).toBeEnabled()
  expect(onClose).not.toHaveBeenCalled()
  fireEvent(view.getByRole('dialog'), new Event('cancel', { cancelable: true }))
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('SVG preview isolates SVG identifiers and does not offer image editing', () => {
  const view = render(
    <MediaPreview
      source={{ kind: 'svg', svg: '<svg id="diagram" />', width: 100, height: 200 }}
      onClose={vi.fn()}
    />,
  )
  expect(view.queryByRole('button', { name: 'Crop' })).toBeNull()
  expect(view.queryByRole('button', { name: 'Stretch' })).toBeNull()
  expect(view.getByTitle('Diagram preview content')).toHaveAttribute('sandbox', '')
  expect(document.getElementById('diagram')).toBeNull()
  fireEvent.click(view.getByRole('button', { name: 'Rotate left' }))
  expect(view.getByTitle('Diagram preview content').parentElement?.parentElement).toHaveStyle({
    width: '200px',
    height: '100px',
  })
})

test.each([undefined, '-20 10 200 100'])(
  'SVG viewBox %s is normalized only when absent',
  viewBox => {
    const svg = `<svg width="200" height="100" ${viewBox === undefined ? '' : `viewBox="${viewBox}"`}><foreignObject width="100" height="80"><div xmlns="http://www.w3.org/1999/xhtml">First<br>Second<svg width="20" height="20"><rect width="20" height="20" /></svg></div></foreignObject></svg>`
    const view = render(
      <MediaPreview source={{ kind: 'svg', svg, width: 200, height: 100 }} onClose={vi.fn()} />,
    )
    const frame = view.getByTitle('Diagram preview content')
    const parsed = new DOMParser().parseFromString(frame.getAttribute('srcdoc')!, 'text/html')
    const root = parsed.body.querySelector(':scope > svg')!
    expect(root.getAttribute('viewBox')).toBe(viewBox ?? '0 0 200 100')
    expect(root.querySelector('foreignObject br')).not.toBeNull()
    expect(root.querySelector('foreignObject div')?.textContent).toBe('FirstSecond')
    const nested = root.querySelector('svg')!
    expect(nested.getAttribute('width')).toBe('20')
    expect(nested.getAttribute('height')).toBe('20')
    expect(nested.hasAttribute('viewBox')).toBe(false)
    const snapshot = frame.getAttribute('srcdoc')
    fireEvent.click(view.getByRole('button', { name: 'Zoom in' }))
    expect(frame).toHaveAttribute('srcdoc', snapshot!)
    expect(frame).toHaveStyle({ width: '250px', height: '125px' })
  },
)

test('SVG preview waits until client effects to parse the document', () => {
  const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
  try {
    const html = renderToString(
      <MediaPreview
        source={{ kind: 'svg', svg: '<svg width="200" height="100"/>', width: 200, height: 100 }}
        onClose={vi.fn()}
      />,
    )
    expect(parse).not.toHaveBeenCalled()
    expect(html).toContain('<iframe')
    expect(html).not.toContain('srcDoc=')
  } finally {
    parse.mockRestore()
  }
})
