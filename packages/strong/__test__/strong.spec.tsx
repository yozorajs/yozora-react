import React from 'react'
import { mount, shallow } from 'enzyme'
import Strong from '../src'


describe('test suite: Test component', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('expect render a simple content', () => {
    const text = 'Hello, world!'
    const wrapper = shallow(
      <Strong>
        <span>
          <Strong>{ text }</Strong>
        </span>
      </Strong>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('expect render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = shallow(
      <Strong className={ className }>
        <span>{ text }</span>
      </Strong>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <Strong>
            { value }
          </Strong>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <Strong ref={ ref } data-value="waw">
        1
      </Strong>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })
})
