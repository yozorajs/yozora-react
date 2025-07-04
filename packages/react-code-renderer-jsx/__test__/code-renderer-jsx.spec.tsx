import { css } from '@emotion/css'
import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import CodeRendererJsx from '../src'

const scope = { css }

function Wrapper(props: { code: string; inline: boolean }): React.ReactElement {
  const [error, setError] = React.useState<string | null>(null)
  return (
    <div>
      <CodeRendererJsx code={props.code} inline={props.inline} scope={scope} onError={setError} />
      <pre>{error}</pre>
    </div>
  )
}

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('basic', () => {
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
        const classes = {
          container: css\`
            background: hsl(0deg, 10%, 90%);
          \`,
          text: css\`
            color: orange;
          \`,
        }

        render(
          <div className={classes.container}>
            <span className={classes.text}>Hello, world</span>
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
