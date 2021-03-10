import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Math from '../src'


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
    const className = 'custom-math'
    const wrapper = render(
      <Math className={ className } value={ code } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Math value={ value } />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(
      <Math ref={ ref } data-value="waw" value="" />
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const code = `
      \\begin{align}
        f(x) = \\left\\lbrace
          \\begin{aligned}
            &x^2, &x < 0 \\\\
            &\\frac{1}{x^3}, &x > 0
          \\end{aligned}
        \\right.
      \\end{align}
    `

    const wrapper = mount(
      <Math
        value={ code }
        style={{ color: 'orange', fontSize: '16px' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        math: {
          padding: '2px',
          border: '1px solid blue',
          // margin: '0 2px',
          background: 'hsla(210deg, 13%, 12%, 0.05)',
          color: '#d81848',
        }
      }
    }

    const code = `
      \\begin{align}
        f(x) = \\left\\lbrace
          \\begin{aligned}
            &x^2, &x < 0 \\\\
            &\\frac{1}{x^3}, &x > 0
          \\end{aligned}
        \\right.
      \\end{align}
    `

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <Math
          value={ code }
          style={{ color: 'orange', fontSize: '16px' }}
        />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
