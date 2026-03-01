import { render } from '@testing-library/react'
import type { ICodeRunnerProps } from '@yozora/core-react-types'
import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import React from 'react'
import { vi } from 'vitest'
import CodeEmbed from '../src'

function createConsoleMock(methods: Array<'warn' | 'error'>): { restore: () => void } {
  const spies = methods.map(method =>
    vi.spyOn(console, method).mockImplementation(() => {
      return undefined
    }),
  )
  return {
    restore: () => {
      for (const spy of spies) spy.mockRestore()
    },
  }
}

const code = `
  function Counter() {
    const [count, setCount] = React.useState(0)
    return (
      <div>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <span>{count}</span>
        <button onClick={() => setCount(c => c - 1)}>-</button>
      </div>
    )
  }
`

const JsxRunner: React.FC<ICodeRunnerProps> = ({ value, onError }) => {
  return <CodeRendererJsx code={value} inline={true} onError={onError} />
}

// Fake timers using Jest
beforeEach(() => {
  vi.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

describe('prop types', () => {
  test('value is required (undefined)', () => {
    const logger = createConsoleMock(['warn', 'error'])
    const view = render(<CodeEmbed lang="jsx" value={undefined as any} runner={JsxRunner} />)
    expect(view.getByText(/TypeError: Cannot read properties of undefined/)).toBeInTheDocument()
    logger.restore()
  })

  test('value is required (null)', () => {
    const logger = createConsoleMock(['warn', 'error'])
    const view = render(<CodeEmbed lang="jsx" value={null as any} runner={JsxRunner} />)
    expect(view.getByText(/TypeError: Cannot read properties of null/)).toBeInTheDocument()
    logger.restore()
  })

  test('className is optional (default)', () => {
    const view = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
    expect(view.container.firstChild).toHaveClass('yozora-code-embed')
  })

  test('className is optional (custom)', () => {
    const view = render(
      <CodeEmbed lang="jsx" value={code} runner={JsxRunner} className="my-code-embed" />,
    )
    expect(view.container.firstChild).toHaveClass('yozora-code-embed')
    expect(view.container.firstChild).toHaveClass('my-code-embed')
  })

  test('style is optional', () => {
    const view = render(
      <CodeEmbed
        lang="jsx"
        value={code}
        runner={JsxRunner}
        style={{ color: 'rgb(255, 165, 0)' }}
      />,
    )
    expect(view.container.firstChild).toHaveStyle({ color: 'rgb(255, 165, 0)' })
  })
})

describe('snapshot', () => {
  test('basic', () => {
    const view = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})
