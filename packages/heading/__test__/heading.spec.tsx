import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Heading from '../src'


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
      <Heading level={ 3 } identifier="heading-22">{ text }</Heading>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-heading'
    const wrapper = render(
      <Heading level={ 1 } identifier="heading-33" className={ className }>
        <span>{ text }</span>
      </Heading>
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('level is a required enum number', () => {
    for (const level of [0, '1', 1.2, 7] as any[]) {
      expect(() => {
        render(
          <Heading level={ level } identifier={ `heading-${ level }` }>
            heading { level }
          </Heading>
        )
      }).toThrow(/Failed prop type: Invalid prop `level`/i)
    }
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <Heading level={ 1 } identifier="heading-1">
            { value }
          </Heading>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const level = 1
    const wrapper = mount(
      <Heading level={ level } ref={ ref } identifier={ `heading-${ level }` } data-value="waw">
        Heading { level }
      </Heading>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const level = 2
    const wrapper = render(
      <Heading
        level={ level }
        identifier={ `heading-${ level }` }
        style={ { color: 'orange', fontSize: '16px' } }
      >
        Waw -- { level }, 中文标题“这”
      </Heading>
    )
    expect(wrapper).toMatchSnapshot(`level ${ level }`)
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        heading: {
          fontStyle: 'italic',
          color: '#ccc',
          padding: '0 2em',
          borderColor: 'lightgray',
          // margin: '1.2em -2em 1em',
          lineHeight: 1.25,
          fontFamily: 'inherit',
          h1FontSize: '2em',
          h2FontSize: '1.5em',
          h3FontSize: '1.25em',
          h4FontSize: '1em',
          h5FontSize: '0.875em',
          h6FontSize: '0.85em',
          linkColor: 'blue',
          hoverLinkColor: 'cyan',
        }
      }
    }

    const level = 1
    const wrapper = render(
      <ThemeProvider theme={ theme }>
        <Heading
          level={ level }
          identifier={ `heading-${ level }` }
          style={ { color: 'orange', fontSize: '16px' } }
        >
          Waw -- { level }, 中文标题“这”
        </Heading>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
