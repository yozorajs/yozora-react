import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Code from '../src'


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
    const code = 'let a = 1'
    const className = 'custom-code'
    const wrapper = render(
      <Code className={ className } value={ code } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Code value={ value } />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(
      <Code ref={ ref } data-value="waw" value="let a: number = 1 + 2;" />
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Code
        lang="typescript"
        value="let a: number = 1 + 2;"
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        code: {
          padding: '2px',
          border: '1px solid blue',
          // margin: '0 2px',
          background: 'hsla(210deg, 13%, 12%, 0.05)',
        }
      }
    }

    const code = `
      const a = 1, b = 2, c = 3
      const result = 3 * a * a * a + 2 * b * b + c
      console.log('result:', result)
    `

    const wrapper = render(
      <ThemeProvider theme={ theme }>
        <Code lang="typescript" value={ code } />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
