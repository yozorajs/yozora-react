import { jest } from '@jest/globals'
import { fireEvent, render, waitFor } from '@testing-library/react'
import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import type { ICodeRunnerItem, ICodeRunnerProps } from '@yozora/react-code-runners'
import React from 'react'
import CodeLive from '../src'

const code = `
  function Counter() {
    const [count, setCount] = React.useState(0)
    return (
      <div>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <span data-testid="value">{count}</span>
        <button onClick={() => setCount(c => c - 1)}>-</button>
      </div>
    )
  }
`

const JsxRunner: React.FC<ICodeRunnerProps> = ({ value, onError }) => {
  return <CodeRendererJsx code={value} inline={true} onError={onError} />
}

const runners: ICodeRunnerItem[] = [
  {
    title: 'jsx',
    pattern: /^jsx$/,
    runner: JsxRunner,
  },
]

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('prop types', () => {
  test('change and debounce', async () => {
    const code1 = 'function Demo() { return <span data-testid="value">3</span> }'
    const code2 = 'function Demo() { return <span data-testid="value">4</span> }'

    const view = render(<CodeLive lang="jsx" value={code1} runners={runners} />)
    await waitFor(() => {
      const textarea = view.getByRole('textbox')
      expect(textarea.textContent).toEqual(code1)
      expect(view.getByTestId('value').textContent).toEqual('3')
    })

    // change code
    fireEvent.change(view.getByRole('textbox'), { target: { value: code2 } })

    // Fast-forward time (await debounce)
    await waitFor(() => {
      expect(view.getByRole('textbox').textContent).toEqual(code2)
      expect(view.getByTestId('value').textContent).toEqual('4')
    })
  })
})

describe('snapshot', () => {
  test('basic', () => {
    const view = render(<CodeLive lang="jsx" value={code} runners={runners} />)
    expect(view.getByRole('textbox').textContent).toEqual(code)
    expect(view.getByTestId('value').textContent).toEqual('0')
    expect(view.asFragment()).toMatchSnapshot()
  })
})
