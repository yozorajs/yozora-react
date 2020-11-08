import React from 'react'
import { mount, shallow } from 'enzyme'
import { ListItem } from '../src'


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
    const wrapper = shallow(
      <ListItem key={ 1 }>
        <span>
          <ListItem key={ 1 }>{ text }</ListItem>
        </span>
      </ListItem>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list-item'
    const wrapper = shallow(
      <ListItem key={ 1 } className={ className }>
        <span>{ text }</span>
      </ListItem>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <ListItem key={ 1 }>
            { value }
          </ListItem>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLLIElement>()
    const wrapper = mount(
      <ListItem ref={ ref } key={ 1 } data-value="waw">
        1
      </ListItem>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <ListItem key={ 1 } status="done" style={ { color: 'orange', fontSize: '16px' } }>
        some text1
        <span>some text2</span>
      </ListItem>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
