import React from 'react'
import { mount, render } from 'enzyme'
import { ListItem, UnorderedList } from '../src'


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
        <ListItem index={ 0 }>{ text }</ListItem>
      </UnorderedList>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list'
    const wrapper = render(
      <UnorderedList className={ className }>
        <ListItem index={ 0 }><span>{ text }</span></ListItem>
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
        <ListItem index={ 0 }>apple</ListItem>
        <ListItem index={ 1 }>banana</ListItem>
        <ListItem index={ 2 }>cat</ListItem>
      </UnorderedList >
    )
    expect(wrapper.getDOMNode()).toEqual(ref.current)
    expect(wrapper.getDOMNode().getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <UnorderedList>
        <ListItem index={ 0 }>apple</ListItem>
        <ListItem index={ 1 }>banana</ListItem>
        <ListItem index={ 2 }>cat</ListItem>
      </UnorderedList>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
