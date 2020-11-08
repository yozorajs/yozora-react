import React from 'react'
import { render } from 'enzyme'
import Code from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('snapshot', () => {
    const wrapper = render(
      <Code
        lang="typescript"
        value="let a: number = 1 + 2;"
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
