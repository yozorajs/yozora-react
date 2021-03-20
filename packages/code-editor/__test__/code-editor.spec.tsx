import { mount } from 'enzyme'
import React, { useState } from 'react'
import CodeEditor from '../src'

describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('input change', () => {
    const code1 = 'let a: number = 1 + 2;'
    const code2 = 'let a: boolean = true;'

    function Wrapper(): React.ReactElement {
      const [code, setCode] = useState<string>(code1)

      return <CodeEditor lang="typescript" code={code} onChange={setCode} />
    }

    const wrapper = mount(<Wrapper />)
    expect(wrapper.find('textarea').text()).toEqual(code1)
    expect(wrapper.find('pre').text()).toEqual(
      code1
        .split(/\n/g)
        .map((x, i) => '' + (i + 1) + x)
        .join('\n'),
    )

    // change code
    wrapper.find('textarea').simulate('change', { target: { value: code2 } })

    expect(wrapper.find('textarea').text()).toEqual(code2)
    expect(wrapper.find('pre').text()).toEqual(
      code2
        .split(/\n/g)
        .map((x, i) => '' + (i + 1) + x)
        .join('\n'),
    )
  })
})
