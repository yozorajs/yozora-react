import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import List from '../src'


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
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List ordered={ ordered } start={ 0 }>
          <li key={ 0 }>{ text }</li>
        </List>
      )
      expect(wrapper.text()).toEqual(text)
    }
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list'
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List ordered={ ordered } start={ 0 } className={ className }>
          <li key={ 0 }><span>{ text }</span></li>
        </List>
      )
      expect(wrapper.hasClass(className)).toEqual(true)
      expect(wrapper.text()).toEqual(text)
    }
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <List ordered={ true } start={ 1 } data-value="waw">
            { value }
          </List >
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    for (const ordered of [false, true]) {
      const ref = React.createRef<HTMLUListElement | HTMLOListElement>()
      const wrapper = mount(
        <List ordered={ ordered } ref={ ref } start={ 1 } type="a" data-value="waw">
          <li key={ 0 }>First: Good afternoon!</li>
          <li key={ 1 }>Second: Good night!</li>
        </List>
      )
      expect(wrapper.getDOMNode()).toEqual(ref.current)
      expect(wrapper.getDOMNode().getAttribute('data-value')).toEqual('waw')
    }
  })

  it('snapshot', () => {
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List ordered={ ordered } start={ 3 } type="a">
          <li key={ 0 }>apple</li>
          <li key={ 1 }>banana</li>
          <li key={ 2 }>cat</li>
        </List>
      )
      expect(wrapper).toMatchSnapshot(ordered ? 'ol' : 'ul')
    }
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        list: {
          color: 'red',
          padding: '0 1rem',
          margin: 18,
          // lineHeight: 1.5,
        }
      }
    }

    for (const ordered of [false, true]) {
      const wrapper = render(
        <ThemeProvider theme={ theme }>
          <List ordered={ ordered } start={ 3 } type="a">
            <li key={ 0 }>apple</li>
            <li key={ 1 }>banana</li>
            <li key={ 2 }>cat</li>
          </List>
        </ThemeProvider>
      )
      expect(wrapper).toMatchSnapshot(ordered ? 'ol' : 'ul')
    }
  })
})
