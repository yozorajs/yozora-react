import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { ExternalLink as Link } from '../src'


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
      <Link url="#">{ text }</Link>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-link'
    const wrapper = render(
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
        render(<Link url={ value }>link text</Link>
        )
      }).toThrow(/Failed prop type: The prop `url` is marked as required/i)

      expect(() => {
        render(<Link url="/home">{ value }</Link>)
      }).toThrow(/Failed prop type: The prop `children` is marked as required/i)
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
    const wrapper = render(
      <Link
        url="/home"
        title="home"
        style={{ color: 'orange', fontSize: '16px' }}
      >
        some text1
        <span>some text2</span>
      </Link>
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
      <ThemeProvider theme={ theme }>
        <Link
          url="/home"
          title="home"
          style={{ color: 'orange', fontSize: '16px' }}
        >
          some text1
          <span>some text2</span>
        </Link>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
