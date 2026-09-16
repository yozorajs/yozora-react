import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { vi } from 'vitest'
import { CodeEmbed, CodeLive, createLazyRenderer } from '../src'

function deferred<T>(): {
  promise: Promise<T>
  resolve(value: T): void
  reject(error: unknown): void
} {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}

test('lazy renderers do not load during SSR', () => {
  const load = vi.fn(async () => ({ default: () => <span>loaded</span> }))
  const Renderer = createLazyRenderer(load)
  expect(renderToString(<Renderer />)).toBe('')
  expect(load).not.toHaveBeenCalled()
})

test('loading stays inside the preview and a resolved renderer keeps its state', async () => {
  const request = deferred<{ default: React.ComponentType<{ code: string }> }>()
  const load = vi.fn(() => request.promise)
  const Renderer = createLazyRenderer(load)
  const runner: React.ComponentProps<typeof CodeEmbed>['runner'] = props => (
    <Renderer code={props.value} />
  )
  const runners = [{ title: 'text', pattern: /^text$/, runner }]
  const view = render(<CodeLive lang="text" value="first" title="Example" runners={runners} />)
  expect(view.getByRole('textbox')).toHaveValue('first')
  expect(view.getByTitle('Example')).toBeInTheDocument()
  expect(load).toHaveBeenCalledTimes(1)

  function Preview({ code }: { code: string }): React.ReactElement {
    const [count, setCount] = React.useState(0)
    return (
      <button type="button" onClick={() => setCount(count + 1)}>
        {code}: {count}
      </button>
    )
  }
  await act(async () => request.resolve({ default: Preview }))
  fireEvent.click(await view.findByRole('button', { name: 'first: 0' }))
  view.rerender(<CodeLive lang="text" value="second" title="Example" runners={runners} />)
  expect(await view.findByRole('button', { name: 'second: 1' })).toBeInTheDocument()
  expect(load).toHaveBeenCalledTimes(1)
})

test('lazy import rejection is displayed as text by CodeEmbed', async () => {
  const request = deferred<{ default: React.ComponentType }>()
  const Renderer = createLazyRenderer(() => request.promise)
  function Runner(): React.ReactElement {
    return <Renderer />
  }
  const logger = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    const view = render(<CodeEmbed lang="jsx" value="same" runner={Runner} />)
    await act(async () => request.reject(new Error('Preview chunk failed')))
    expect(await view.findByText('Preview chunk failed')).toBeInTheDocument()
    view.rerender(<CodeEmbed lang="jsx" value="same" runner={() => <span>recovered</span>} />)
    expect(await view.findByText('recovered')).toBeInTheDocument()
  } finally {
    logger.mockRestore()
  }
})

test('lazy renderer refs reach the loaded component', async () => {
  const Input = React.forwardRef<HTMLInputElement, { label: string }>(function Input(props, ref) {
    return <input ref={ref} aria-label={props.label} />
  })
  const Renderer = createLazyRenderer(async () => ({ default: Input }))
  const ref = React.createRef<HTMLInputElement>()
  const view = render(<Renderer ref={ref} label="lazy input" />)
  expect(await view.findByRole('textbox', { name: 'lazy input' })).toBe(ref.current)
})
