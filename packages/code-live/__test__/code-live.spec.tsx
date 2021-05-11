import CodeRendererJsx from '@yozora/react-code-renderer-jsx'
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import type { CodeRunnerItem, CodeRunnerProps } from '../src'
import CodeLive from '../src'

const code = `
  function Counter() {
    const [count, setCount] = React.useState(0)
    return (
      <div>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <span data-type="value">{count}</span>
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
        if (error != null) console.log(error)
      }}
    />
  )
}

const runners: CodeRunnerItem[] = [
  {
    title: 'jsx',
    pattern: /^jsx$/,
    runner: JsxRunner,
  },
]

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('change and debounce', async () => {
    const code1 = 'function Demo() { return <span data-type="value">3</span> }'
    const code2 = 'function Demo() { return <span data-type="value">4</span> }'

    const wrapper = mount(
      <CodeLive lang="jsx" value={code1} runners={runners} />,
    )

    expect(wrapper.find('textarea').text()).toEqual(code1)
    expect(wrapper.find('[data-type="value"]').text()).toEqual('3')

    // change code
    wrapper.find('textarea').simulate('change', { target: { value: code2 } })
    expect(wrapper.find('textarea').text()).toEqual(code2)
    expect(wrapper.find('[data-type="value"]').text()).toEqual('3')

    // await debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(wrapper.find('textarea').text()).toEqual(code2)
    expect(wrapper.find('[data-type="value"]').text()).toEqual('4')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <CodeLive lang="jsx" value={code} runners={runners} />,
    )

    expect(wrapper.find('textarea').text()).toEqual(code)
    expect(wrapper.find('[data-type="value"]').text()).toEqual('0')
    expect(wrapper).toMatchSnapshot()
  })
})
