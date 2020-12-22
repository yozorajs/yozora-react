import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import InlineCode from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('render a text value', () => {
    const text = 'Hello, world!'
    const wrapper = render(
      <InlineCode value={ text } />
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = render(
      <InlineCode className={ className } value={ text } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<InlineCode value={ value } />)
      }).toThrow(/Failed prop type: The prop `value` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <InlineCode ref={ ref } data-value="waw" value="" />
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <InlineCode
        value="Hello, world!"
        style={{ color: 'orange', fontSize: '16px' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        inlineCode: {
          padding: '2px',
          borderRadius: '3px',
          margin: '0 2px',
          background: 'hsla(210deg, 13%, 12%, 0.05)',
          lineHeight: 1.5,
          color: '#d81848',
          fontFamily: 'Consolas, monospace, sans-serif',
          fontSize: '1em',
          fontWeight: 'inherit',
          fontStyle: undefined,
          // whiteSpace: undefined,
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <InlineCode
          value="Hello, world!"
          style={{ color: 'orange', fontSize: '16px' }}
        />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
