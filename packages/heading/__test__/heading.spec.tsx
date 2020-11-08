import React from 'react'
import { mount, render } from 'enzyme'
import Heading from '../src'


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
      <Heading level={ 3 }>{ text }</Heading>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-heading'
    const wrapper = render(
      <Heading level={ 1 } className={ className }>
        <span>{ text }</span>
      </Heading>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('level is a required enum number', () => {
    for (const level of [0, '1', 1.2, 7] as any[]) {
      expect(() => {
        mount(
          <Heading level={ level }>
            heading { level }
          </Heading>
        )
      }) // .toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <Heading level={ 1 }>
            { value }
          </Heading>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const level = 1
    const wrapper = mount(
      <Heading level={ level } ref={ ref } data-value="waw">
        Heading { level }
      </Heading>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const level = 2
    const wrapper = mount(
      <Heading
        level={ level }
        style={ { color: 'orange', fontSize: '16px' } }
      >
        Waw -- { level }, 中文标题“这”
      </Heading>
    )
    expect(wrapper).toMatchSnapshot(`level ${ level }`)
  })
})
