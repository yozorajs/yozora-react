import React from 'react'
import { mount, shallow } from 'enzyme'
import Link from '../src'


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
      <Link url="#">{ text }</Link>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-link'
    const wrapper = shallow(
      <Link url="#" className={ className }>
        <span>{ text }</span>
      </Link>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('url and children both are required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <Link url={value}>
            link text
          </Link>
        )
      }).toThrow(/Failed prop type: The prop `url` is marked as required/)

      expect(() => {
        mount(
          <Link url="/home">
            { value }
          </Link>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLAnchorElement>()
    const wrapper = mount(
      <Link
        ref={ ref }
        url="/home"
        data-value="waw"
      >
        1
      </Link>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <Link
        url="/home"
        title="home"
        style={ { color: 'orange', fontSize: '16px' } }
      >
        some text1
        <span>some text2</span>
      </Link>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
