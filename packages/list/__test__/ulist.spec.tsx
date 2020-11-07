import React from 'react'
import { mount, render } from 'enzyme'
import { UnorderedList } from '../src'


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
      <UnorderedList>
        <li>{ text }</li>
      </UnorderedList>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list'
    const wrapper = render(
      <UnorderedList className={ className }>
        <li><span>{ text }</span></li>
      </UnorderedList>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <UnorderedList data-value="waw">
            { value }
          </UnorderedList >
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLUListElement>()
    const wrapper = mount(
      <UnorderedList ref={ ref } data-value="waw">
        <li>apple</li>
        <li>banana</li>
        <li>cat</li>
      </UnorderedList >
    )
    expect(wrapper.getDOMNode()).toEqual(ref.current)
    expect(wrapper.getDOMNode().getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <UnorderedList>
        <li>apple</li>
        <li>banana</li>
        <li>cat</li>
      </UnorderedList>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
