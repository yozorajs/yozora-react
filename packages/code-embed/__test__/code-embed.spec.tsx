import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import { render } from 'enzyme'
import React from 'react'
import type { CodeRunnerProps } from '../src'
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

const JsxRunner = ({ value }: CodeRunnerProps): React.ReactElement => {
  return (
    <CodeRendererJsx
      code={value}
      inline={true}
      onError={error => {
        console.log(error)
      }}
    />
  )
}

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<CodeEmbed lang="jsx" value={value} CodeRunner={JsxRunner} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(
        <CodeEmbed lang="jsx" value={code} CodeRunner={JsxRunner} />,
      )
      expect(node.hasClass('yozora-code-embed')).toEqual(true)
    })

    it('custom', function () {
      const node = render(
        <CodeEmbed
          lang="jsx"
          value={code}
          CodeRunner={JsxRunner}
          className="my-code-embed"
        />,
      )
      expect(node.hasClass('yozora-code-embed')).toEqual(true)
      expect(node.hasClass('my-code-embed')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(
      <CodeEmbed
        lang="jsx"
        value={code}
        CodeRunner={JsxRunner}
        style={{ color: 'orange' }}
      />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('basic', () => {
    const wrapper = render(
      <CodeEmbed lang="jsx" value={code} CodeRunner={JsxRunner} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
