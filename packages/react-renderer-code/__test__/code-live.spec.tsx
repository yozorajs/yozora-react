import { act, fireEvent, render } from '@testing-library/react'
import type { ICodeRunnerItem, ICodeRunnerProps } from '@yozora/react-core'
import CodeRendererJsx from '@yozora/react-embed-jsx'
import React from 'react'
import { vi } from 'vitest'
import { CodeLive } from '../src'

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

describe('editing behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  test('debounces consecutive edits before updating the preview', () => {
    const code1 = 'function Demo() { return <span data-testid="value">3</span> }'
    const code2 = 'function Demo() { return <span data-testid="value">4</span> }'
    const code3 = 'function Demo() {\n return <span data-testid="value">5</span> }'

    const view = render(
      <CodeLive lang="jsx" value={code1} runners={runners} title="Demo" collapsed={true} />,
    )
    expect(view.getByRole('textbox')).toHaveValue(code1)
    expect(view.getByTestId('value')).toHaveTextContent('3')

    fireEvent.change(view.getByRole('textbox'), { target: { value: code2 } })
    expect(view.getByRole('textbox')).toHaveValue(code2)
    expect(view.getByTestId('value')).toHaveTextContent('3')

    fireEvent.change(view.getByRole('textbox'), { target: { value: code3 } })
    expect(view.getByRole('textbox')).toHaveValue(code3)
    expect(view.getByTestId('value')).toHaveTextContent('3')

    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(view.getByRole('textbox')).toHaveValue(code3)
    expect(view.getByTestId('value')).toHaveTextContent('5')
    expect(view.getByTitle('Demo')).toHaveTextContent('2 lines.')
  })

  test('updates the editor, preview and line count when value changes', () => {
    const code1 = 'function Demo() {\r\n return <span data-testid="value">3</span> }'
    const code2 = 'function Demo() {\r\n return (\r\n <span data-testid="value">4</span>) }'
    const view = render(
      <CodeLive lang="jsx" value={code1} runners={runners} title="Demo" collapsed={true} />,
    )
    expect(view.getByTitle('Demo')).toHaveTextContent('2 lines.')

    view.rerender(
      <CodeLive lang="jsx" value={code2} runners={runners} title="Demo" collapsed={true} />,
    )
    expect(view.getByRole('textbox')).toHaveValue(code2.replace(/\r\n/g, '\n'))
    expect(view.getByTestId('value')).toHaveTextContent('4')
    expect(view.getByTitle('Demo')).toHaveTextContent('3 lines.')
  })

  test('value changes supersede pending edits', () => {
    const code1 = 'function Demo() { return <span data-testid="value">3</span> }'
    const code2 = 'function Demo() { return <span data-testid="value">4</span> }'
    const code3 = 'function Demo() { return <span data-testid="value">5</span> }'
    const view = render(<CodeLive lang="jsx" value={code1} runners={runners} />)

    fireEvent.change(view.getByRole('textbox'), { target: { value: code2 } })
    view.rerender(<CodeLive lang="jsx" value={code3} runners={runners} />)
    expect(view.getByRole('textbox')).toHaveValue(code3)
    expect(view.getByTestId('value')).toHaveTextContent('5')

    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(view.getByRole('textbox')).toHaveValue(code3)
    expect(view.getByTestId('value')).toHaveTextContent('5')
  })

  test('updates the layout collapse state with the toolbar controls', () => {
    const view = render(<CodeLive lang="jsx" value={code} runners={runners} />)
    const main = view.container.querySelector('.yozora-code-live__main')
    expect(main).not.toHaveAttribute('data-collapsed')

    fireEvent.click(view.getByTitle('minimize'))
    expect(main).toHaveAttribute('data-collapsed', 'true')
    expect(view.getByTestId('value')).toHaveTextContent('0')

    fireEvent.click(view.getByTitle('maximize'))
    expect(main).not.toHaveAttribute('data-collapsed')
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
