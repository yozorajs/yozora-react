import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import InlineMath from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('render with custom className', () => {
    const code = 'x^2 + y^2 = z^2'
    const className = 'custom-inline-math'
    const wrapper = render(
      <InlineMath className={ className } value={ code } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<InlineMath value={ value } />)
      }).toThrow(/Failed prop type: The prop `value` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <InlineMath ref={ ref } data-value="waw" value=""/>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <InlineMath
        value="x^2 + y^2 = z^2"
        style={ { color: 'orange', fontSize: '16px' } }
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        inlineMath: {
          padding: '2px',
          border: '1px solid blue',
          // margin: '0 2px',
          background: 'hsla(210deg, 13%, 12%, 0.05)',
          color: '#d81848',
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <InlineMath
          value="x^2 + y^2 = z^2"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
