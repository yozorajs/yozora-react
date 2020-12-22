import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
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
    const wrapper = render(
      <Router>
        <Link url="#">{ text }</Link>
      </Router>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-link'
    const wrapper = render(
      <Router>
        <Link url="https://www.github.com" className={ className }>
          <span>{ text }</span>
        </Link>
      </Router>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('url and children both are required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <Router>
            <Link url={ value }>link text</Link>
          </Router>
        )
      }).toThrow(/Failed prop type: The prop `url` is marked as required/i)

      expect(() => {
        render(
          <Router>
            <Link url="/home">{ value }</Link>
          </Router>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLAnchorElement>()
    const wrapper = mount(
      <Router>
        <Link
          ref={ ref }
          url="https://www.github.com"
          data-value="waw"
        >
          1
        </Link>
      </Router>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Router>
        <Link
          url="/home"
          title="home"
          style={{ color: 'orange', fontSize: '16px' }}
        >
          some text1
          <span>some text2</span>
        </Link>
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        link: {
          color: 'blue',
          fontSize: undefined,
          fontStyle: 'italic',
          textDecoration: 'none',
        }
      }
    }

    const wrapper = mount(
      <Router>
        <ThemeProvider theme={ theme }>
          <Link
            url="https://www.github.com"
            title="home"
            style={{ color: 'orange', fontSize: '16px' }}
          >
            some text1
            <span>some text2</span>
          </Link>
        </ThemeProvider>
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
