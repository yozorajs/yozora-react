import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import CodeRendererJsx from '../src'

const scope = { accent: 'orange' }

function Wrapper(props: { code: string; inline: boolean }): React.ReactElement {
  const [error, setError] = React.useState<string | null>(null)
  return (
    <div>
      <CodeRendererJsx code={props.code} inline={props.inline} scope={scope} onError={setError} />
      <pre>{error}</pre>
    </div>
  )
}

describe('basic', () => {
  test('preserves preview state when the default TypeScript setting becomes explicit', () => {
    const code = `function Counter() {
      const [count, setCount] = React.useState(0 as number)
      return <button onClick={() => setCount(count + 1)}>{count}</button>
    }`
    const onError = vi.fn()
    const view = render(<CodeRendererJsx code={code} inline={true} onError={onError} />)
    fireEvent.click(view.getByRole('button', { name: '0' }))
    expect(view.getByRole('button', { name: '1' })).toBeInTheDocument()
    view.rerender(
      <CodeRendererJsx code={code} inline={true} enabledTypeScript={true} onError={onError} />,
    )
    expect(view.getByRole('button', { name: '1' })).toBeInTheDocument()
    view.rerender(<CodeRendererJsx code={code} inline={true} onError={onError} />)
    expect(view.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(onError).toHaveBeenCalledTimes(1)
  })

  test('recompiles when only the render mode changes', () => {
    const code = '(<span>mode preview</span>)'
    const onError = vi.fn()
    const view = render(<CodeRendererJsx code={code} inline={true} onError={onError} />)
    expect(view.getByText('mode preview')).toBeInTheDocument()
    view.rerender(<CodeRendererJsx code={code} inline={false} onError={onError} />)
    expect(view.queryByText('mode preview')).not.toBeInTheDocument()
    expect(onError).toHaveBeenLastCalledWith(
      'SyntaxError: No-Inline evaluations must call `render`.',
    )
    view.rerender(<CodeRendererJsx code={code} inline={true} onError={onError} />)
    expect(view.getByText('mode preview')).toBeInTheDocument()
    expect(onError).toHaveBeenLastCalledWith(null)
  })

  test('recompiles when only TypeScript support changes', () => {
    const code = '(<span>typed preview</span> as React.ReactNode)'
    const onError = vi.fn()
    const view = render(
      <CodeRendererJsx code={code} inline={true} enabledTypeScript={true} onError={onError} />,
    )
    expect(view.getByText('typed preview')).toBeInTheDocument()
    view.rerender(
      <CodeRendererJsx code={code} inline={true} enabledTypeScript={false} onError={onError} />,
    )
    expect(view.queryByText('typed preview')).not.toBeInTheDocument()
    expect(onError).toHaveBeenLastCalledWith(expect.stringContaining('SyntaxError'))
    view.rerender(
      <CodeRendererJsx code={code} inline={true} enabledTypeScript={true} onError={onError} />,
    )
    expect(view.getByText('typed preview')).toBeInTheDocument()
    expect(onError).toHaveBeenLastCalledWith(null)
  })
  describe('inline', () => {
    test('greet', () => {
      const code = `
        (
          <div>
            <span>Hello, world</span>
          </div>
        )
      `
      const view = render(<Wrapper code={code} inline={true} />)

      expect(view.getByText('Hello, world')).toBeInTheDocument()
    })

    test('greet -- function component', () => {
      const code = `
        function Greet() {
          return (
            <div>
              <span>Hello, world</span>
            </div>
          )
        }
      `

      const view = render(<Wrapper code={code} inline={true} />)
      expect(view.getByText('Hello, world')).toBeInTheDocument()
    })

    test('counter -- function component', async () => {
      const code = `
        function Counter() {
          const [count, setCount] = React.useState(0)
          const onIncrement = React.useCallback(() => setCount(c => c + 1), [])
          const onDecrement = React.useCallback(() => setCount(c => c - 1), [])

          return (
            <div>
              <button onClick={onIncrement}>+</button>
              <span data-testid="counter">{count}</span>
              <button onClick={onDecrement}>-</button>
            </div>
          )
        }
      `
      const view = render(<Wrapper code={code} inline={true} />)

      const counter = await view.findByTestId('counter')
      expect(counter.textContent).toEqual('0')

      fireEvent.click(await view.findByText('+'))
      fireEvent.click(await view.findByText('+'))
      fireEvent.click(await view.findByText('+'))
      expect(counter.textContent).toEqual('3')

      fireEvent.click(await view.findByText('-'))
      fireEvent.click(await view.findByText('-'))

      await waitFor(() => {
        expect(counter.textContent).toEqual('1')
      })
    })
  })

  describe('block', () => {
    test('Render No-Inline evaluations.', () => {
      const code = `
        render(
          <div>
            <span style={{ color: accent }}>Hello, world</span>
          </div>
        )
      `
      const view = render(<Wrapper code={code} inline={false} />)

      const textElement = view.getByText('Hello, world')
      expect(textElement).toBeInTheDocument()
      expect(textElement).toHaveStyle({ color: 'rgb(255, 165, 0)' })
    })

    test('`render` must be called with valid JSX.', () => {
      const code = 'render(undefined)'
      const view = render(<Wrapper code={code} inline={false} />)

      expect(
        view.getByText('SyntaxError: `render` must be called with valid JSX.'),
      ).toBeInTheDocument()
    })

    test('Call `render` is required for No-Inline evaluations.', () => {
      const code = '(<div>hello</div>)'
      const view = render(<Wrapper code={code} inline={false} />)

      expect(
        view.getByText('SyntaxError: No-Inline evaluations must call `render`.'),
      ).toBeInTheDocument()
    })
  })

  describe('exceptions', () => {
    test('inline', () => {
      const code = 'function Demo() { return <div>waw</span> })'
      const view = render(<Wrapper code={code} inline={true} />)

      expect(view.queryByText('waw')).toBeNull()
      expect(view.getByText(/^SyntaxError: Unexpected token/)).toBeInTheDocument()
    })

    // test('block', () => {
    //   const code = `render(<div>waw</span>)`
    //   const view = render(<Wrapper code={code} inline={false} />)

    //   expect(view.queryByText('waw')).toBeNull()
    //   expect(
    //     view.getByText(/^SyntaxError: Unexpected token/),
    //   ).toBeInTheDocument()
    // })
  })
})
