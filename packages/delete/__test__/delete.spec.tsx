import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Delete from '../src'


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
      <Delete>
        <span>
          <Delete>{ text }</Delete>
        </span>
      </Delete>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = render(
      <Delete className={ className }>
        <span>{ text }</span>
      </Delete>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Delete>{ value }</Delete>)
      }).toThrow(/Failed prop type: The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <Delete ref={ ref } data-value="waw">
        1
      </Delete>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Delete style={{ color: 'orange', fontSize: '16px' }}>
        some text1
        <span>some text2</span>
      </Delete>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        delete: {
          color: 'red',
          fontSize: 18,
          fontWeight: undefined,
          // fontStyle: 'oblique',
          textDecoration: 'dashed',
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <Delete>
          some text1
          <span>some text2</span>
        </Delete>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
