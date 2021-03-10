import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Emphasis from '../src'


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
      <Emphasis>{ text }</Emphasis>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = render(
      <Emphasis className={ className }>
        <span>{ text }</span>
      </Emphasis>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Emphasis>{ value }</Emphasis>)
      }).toThrow(/The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <Emphasis ref={ ref } data-value="waw">
        1
      </Emphasis>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Emphasis style={{ color: 'orange', fontSize: '16px' }}>
        some text1
        <span>some text2</span>
      </Emphasis>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        emphasis: {
          color: 'red',
          fontSize: 18,
          fontWeight: undefined,
          fontStyle: 'oblique',
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <Emphasis>
          some text1
          <span>some text2</span>
        </Emphasis>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
