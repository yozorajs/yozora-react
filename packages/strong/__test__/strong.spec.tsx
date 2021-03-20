import { mount, render } from 'enzyme'
import React from 'react'
import type { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import Strong from '../src'

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
      <Strong>
        <span>
          <Strong>{text}</Strong>
        </span>
      </Strong>,
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = render(
      <Strong className={className}>
        <span>{text}</span>
      </Strong>,
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Strong>{value}</Strong>)
      }).toThrow(/The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <Strong ref={ref} data-value="waw">
        1
      </Strong>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Strong style={{ color: 'orange', fontSize: '16px' }}>
        some text1
        <span>some text2</span>
      </Strong>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        strong: {
          color: 'red',
          fontSize: 18,
          // fontWeight: 'bold',
          fontStyle: 'oblique',
        },
      },
    }

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Strong>
          some text1
          <span>some text2</span>
        </Strong>
      </ThemeProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
