import React from 'react'
import { mount, render } from 'enzyme'
import { OrderedList } from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('render a simple content', () => {
    const text = 'Hello, world!'
    const wrapper = render(
      <OrderedList start={ 0 }>
        <li>{ text }</li>
      </OrderedList>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list'
    const wrapper = render(
      <OrderedList start={ 0 } className={ className }>
        <li><span>{ text }</span></li>
      </OrderedList>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <OrderedList start={ 1 } data-value="waw">
            { value }
          </OrderedList >
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLOListElement>()
    const wrapper = mount(
      <OrderedList ref={ ref } start={ 1 } type="a" data-value="waw">
        <li>First: Good afternoon!</li>
        <li>Second: Good night!</li>
      </OrderedList>
    )
    expect(wrapper.getDOMNode()).toEqual(ref.current)
    expect(wrapper.getDOMNode().getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <OrderedList start={ 3 } type="a">
        <li>First: Good afternoon!</li>
        <li>Second: Good night!</li>
      </OrderedList>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
