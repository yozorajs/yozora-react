import { mount, render } from 'enzyme'
import React from 'react'
import type { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import ListItem from '../src'

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
      <ListItem>
        <span>
          <ListItem>{text}</ListItem>
        </span>
      </ListItem>,
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list-item'
    const wrapper = render(
      <ListItem className={className}>
        <span>{text}</span>
      </ListItem>,
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<ListItem>{value}</ListItem>)
      }).toThrow(/The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLLIElement>()
    const wrapper = mount(
      <ListItem ref={ref} data-value="waw">
        1
      </ListItem>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <ListItem status="done" style={{ color: 'orange', fontSize: '16px' }}>
        some text1
        <span>some text2</span>
      </ListItem>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        listItem: {
          color: 'red',
          padding: '0 1rem',
          margin: 18,
          // lineHeight: 1.5,
        },
      },
    }

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ListItem status="doing" style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </ListItem>
      </ThemeProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
