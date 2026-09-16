import { act, fireEvent, render } from '@testing-library/react'
import type { EcmaImport } from '@yozora/ast'
import { EcmaImportType } from '@yozora/ast'
import React from 'react'
import { vi } from 'vitest'
import { CodeEmbed, createUseJsxRunner, dynamicImport } from '../src'

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

function imported(name: string): EcmaImport {
  return {
    type: EcmaImportType,
    moduleName: `./${name}.ts`,
    defaultImport: null,
    namedImports: [{ src: 'value', alias: null }],
  }
}

test('scope loading ignores a replaced request and does not carry old ready state', async () => {
  const a = deferred<{ value: string }>()
  const b = deferred<{ value: string }>()
  const c = deferred<{ value: string }>()
  const requests = { a, b, c }
  const load = vi.fn((name: keyof typeof requests) => requests[name].promise)
  const useRunner = createUseJsxRunner({
    presetJsxScope: {},
    rules: [
      {
        regex: /^\.\/(a|b|c)\.ts$/,
        importFunc: match => () => load(match[1] as keyof typeof requests),
      },
    ],
    defaultRenderMode: 'inline',
    JsxRenderer: ({ scope }) => <output>{String(scope?.value)}</output>,
  })
  function Preview({ name }: { name: string }): React.ReactElement {
    const Runner = useRunner([imported(name)])
    return <CodeEmbed lang="jsx" value="same" runner={Runner} />
  }
  const view = render(
    <React.StrictMode>
      <Preview name="a" />
    </React.StrictMode>,
  )
  await act(async () => {
    await Promise.resolve()
  })
  expect(load).toHaveBeenCalledTimes(1)
  view.rerender(
    <React.StrictMode>
      <Preview name="b" />
    </React.StrictMode>,
  )
  await act(async () => b.resolve({ value: 'B' }))
  expect(await view.findByText('B')).toBeInTheDocument()
  await act(async () => a.reject(new Error('stale request')))
  expect(view.getByText('B')).toBeInTheDocument()
  expect(view.queryByText('stale request')).not.toBeInTheDocument()
  view.rerender(
    <React.StrictMode>
      <Preview name="c" />
    </React.StrictMode>,
  )
  expect(view.queryByText('B')).not.toBeInTheDocument()
  await act(async () => c.resolve({ value: 'C' }))
  expect(await view.findByText('C')).toBeInTheDocument()
})

test('a rejected scope recovers when imports change without changing code', async () => {
  const useRunner = createUseJsxRunner({
    presetJsxScope: {},
    rules: [
      {
        regex: /^\.\/(bad|good)\.ts$/,
        importFunc: match => async () => {
          if (match[1] === 'bad') throw new Error('Module failed')
          return { value: 'ready' }
        },
      },
    ],
    defaultRenderMode: 'inline',
    JsxRenderer: ({ scope }) => <span>{String(scope?.value)}</span>,
  })
  function Preview({ name }: { name: string }): React.ReactElement {
    const Runner = useRunner([imported(name)])
    return <CodeEmbed lang="jsx" value="same" runner={Runner} />
  }
  const view = render(<Preview name="bad" />)
  expect(await view.findByText('Module failed')).toBeInTheDocument()
  view.rerender(<Preview name="good" />)
  expect(await view.findByText('ready')).toBeInTheDocument()
})

test('equivalent imports preserve renderer state and reuse the loader', async () => {
  const load = vi.fn(async () => ({ value: 'ready' }))
  function Renderer(): React.ReactElement {
    const [count, setCount] = React.useState(0)
    return (
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>
    )
  }
  const useRunner = createUseJsxRunner({
    presetJsxScope: {},
    rules: [{ regex: /\.ts$/, importFunc: () => load }],
    JsxRenderer: Renderer,
    defaultRenderMode: 'inline',
  })
  function Preview({ tick }: { tick: number }): React.ReactElement {
    const Runner = useRunner([imported('data')])
    return (
      <div data-tick={tick}>
        <CodeEmbed lang="jsx" value="same" runner={Runner} />
      </div>
    )
  }
  const view = render(<Preview tick={0} />)
  fireEvent.click(await view.findByRole('button', { name: '0' }))
  view.rerender(<Preview tick={1} />)
  expect(view.getByRole('button', { name: '1' })).toBeInTheDocument()
  expect(load).toHaveBeenCalledTimes(1)
})

test('ordinary module loaders reject without mounting and global regexes keep their cursor', async () => {
  const regex = /\.ts$/g
  regex.lastIndex = 7
  const error = new Error('import rejected')
  await expect(
    dynamicImport(imported('data'), {}, [{ regex, importFunc: () => () => Promise.reject(error) }]),
  ).rejects.toBe(error)
  expect(regex.lastIndex).toBe(7)
  const scope: Record<string, unknown> = {}
  const module = { value: 42 }
  await dynamicImport({ ...imported('data'), defaultImport: 'namespace' }, scope, [
    { regex, importFunc: () => async () => module },
  ])
  expect(scope).toEqual({ namespace: module, value: 42 })
})

test('a synchronous rule failure still observes other in-flight rejections', async () => {
  const request = deferred<{ value: string }>()
  const useRunner = createUseJsxRunner({
    presetJsxScope: {},
    rules: [{ regex: /^\.\//, importFunc: () => () => request.promise }],
    JsxRenderer: () => <span>ready</span>,
    defaultRenderMode: 'inline',
  })
  function Preview(): React.ReactElement {
    const Runner = useRunner([imported('data'), { ...imported('bad'), moduleName: './bad.json' }])
    return <CodeEmbed lang="jsx" value="same" runner={Runner} />
  }
  const view = render(<Preview />)
  expect(await view.findByText(/Cannot find module .*bad.json/)).toBeInTheDocument()
  await act(async () => request.reject(new Error('later request failure')))
  expect(view.queryByText('later request failure')).not.toBeInTheDocument()
})
