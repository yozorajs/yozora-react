import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import type { ICodeRunnerProps } from '@yozora/react-code-runners'
import { render } from 'enzyme'
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

const JsxRunner = ({ value }: ICodeRunnerProps): React.ReactElement => {
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

describe('prop types', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<CodeEmbed lang="jsx" value={value} runner={JsxRunner} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  describe('className is optional', () => {
    it('default', () => {
      const node = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
      expect(node.hasClass('yozora-code-embed')).toBeTruthy()
    })

    it('custom', () => {
      const node = render(
        <CodeEmbed lang="jsx" value={code} runner={JsxRunner} className="my-code-embed" />,
      )
      expect(node.hasClass('yozora-code-embed')).toBeTruthy()
      expect(node.hasClass('my-code-embed')).toBeTruthy()
    })
  })

  it('style is optional', () => {
    const node = render(
      <CodeEmbed lang="jsx" value={code} runner={JsxRunner} style={{ color: 'orange' }} />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', () => {
  it('basic', () => {
    const wrapper = render(<CodeEmbed lang="jsx" value={code} runner={JsxRunner} />)
    expect(wrapper).toMatchSnapshot()
  })
})
