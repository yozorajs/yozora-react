import type { IConsoleMock } from '@guanghechen/helper-jest'
import { createConsoleMock } from '@guanghechen/helper-jest'
import { render } from '@testing-library/react'
import type { ICodeRunnerProps } from '@yozora/core-react-types'
import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import React from 'react'
import CodeEmbed from '../src'

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

describe('prop types', () => {
  describe('value is required', () => {
    let logger: IConsoleMock
    beforeEach(() => {
      logger = createConsoleMock(['warn', 'error'])
    })
    afterEach(() => {
      logger.restore()
    })

    test('undefined', () => {
      const view = render(<CodeEmbed lang="jsx" value={undefined as any} runner={JsxRunner} />)
      expect(view.getByText(/TypeError: Cannot read properties of undefined/)).toBeInTheDocument()
    })

    test('null', () => {
      const view = render(<CodeEmbed lang="jsx" value={null as any} runner={JsxRunner} />)
      expect(view.getByText(/TypeError: Cannot read properties of null/)).toBeInTheDocument()
    })
  })

  describe('className is optional', () => {
    test('default', () => {
      const view = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
      expect(view.container.firstChild).toHaveClass('yozora-code-embed')
    })

    test('custom', () => {
      const view = render(
        <CodeEmbed lang="jsx" value={code} runner={JsxRunner} className="my-code-embed" />,
      )
      expect(view.container.firstChild).toHaveClass('yozora-code-embed')
      expect(view.container.firstChild).toHaveClass('my-code-embed')
    })
  })

  test('style is optional', () => {
    const view = render(
      <CodeEmbed lang="jsx" value={code} runner={JsxRunner} style={{ color: 'orange' }} />,
    )
    expect(view.container.firstChild).toHaveStyle({ color: 'orange' })
  })
})

describe('snapshot', () => {
  test('basic', () => {
    const view = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})
