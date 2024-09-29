import { css } from '@emotion/css'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('basic', () => {
  describe('inline', () => {
    test('Pure component should be rendered correctly.', () => {
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

    test('Function component should be rendered correctly.', async () => {
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

      const counter = view.getByTestId('counter')
      expect(counter.textContent).toEqual('0')

      await userEvent.click(view.getByText('+'))
      await userEvent.click(view.getByText('+'))
      await userEvent.click(view.getByText('+'))
      expect(counter.textContent).toEqual('3')

      await userEvent.click(view.getByText('-'))
      await userEvent.click(view.getByText('-'))
      expect(counter.textContent).toEqual('1')
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
      expect(textElement).toHaveStyle({ color: 'orange' })
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
