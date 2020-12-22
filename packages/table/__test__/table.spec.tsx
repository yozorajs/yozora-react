import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Table from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  const rows: React.ReactNode[] = [
    (<tr key="0"><th>Name</th></tr>),
    (<tr key="1"><td>Alice</td></tr>),
    (<tr key="2"><td>Bob</td></tr>),
  ]

  it('render with custom className', () => {
    const className = 'custom-list-item'
    const wrapper = render(
      <Table className={ className } data-value="waw">
        { rows }
      </Table>
    )
    expect(wrapper.find('.' + className) != null).toEqual(true)
    expect(wrapper.text()).toEqual('NameAliceBob')
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Table>{ value }</Table>)
      }).toThrow(/Failed prop type: the prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLTableElement>()
    const wrapper = mount(
      <Table ref={ ref } data-value="waw">
        { rows }
      </Table>
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <Table style={{ color: 'orange', fontSize: '16px' }}>
        { rows }
      </Table>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        table: {
          width: '100%',
          overflow: 'hidden auto',
          margin: 18,
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <Table style={{ color: 'orange', fontSize: '16px' }}>
          { rows }
        </Table>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
