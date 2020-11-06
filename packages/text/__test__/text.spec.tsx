import React from 'react'
import { mount, render, shallow } from 'enzyme'
import Text from '../src'


describe('test suite: Test component', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('expect render a text value', () => {
    const text = 'Hello, world!'
    const wrapper = shallow(
      <Text value={ text } />
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('expect render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = shallow(
      <Text className={ className } value={ text } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <Text value={ value } />
        )
      }).toThrow(/Failed prop type: The prop `value` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <Text ref={ ref } data-value="waw" value=""/>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Text
        value="Hello, world!"
        style={ { color: 'orange', fontSize: '16px' } }
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
