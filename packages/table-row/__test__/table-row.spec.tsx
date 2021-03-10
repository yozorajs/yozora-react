import React from 'react'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import TableRow from '../src'


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
      <table>
        <TableRow>
          <th><span>{ text }</span></th>
        </TableRow>
      </table>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list-item'
    const wrapper = render(
      <table>
        <TableRow>
          <td className={ className }><span>{ text }</span></td>
        </TableRow>
      </table>
    )
    expect(wrapper.find('.' + className) != null).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <table>
            <TableRow>{ value }</TableRow>
          </table>
        )
      }).toThrow(/The prop `children` is marked as required/i)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLTableRowElement>()
    const wrapper = mount(
      <table>
        <tbody>
          <TableRow ref={ ref } data-value="waw">
            <td>1</td>
          </TableRow>
        </tbody>
      </table>
    )

    const o = wrapper.find('tr').getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <table>
        <tbody>
          <TableRow style={{ color: 'orange', fontSize: '16px' }}>
            <td>
              some text1
              <span>some text2</span>
            </td>
          </TableRow>
        </tbody>
      </table>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        tableRow: {
          // background: 'red',
          evenBackground: 'blue',
        }
      }
    }

    const wrapper = mount(
      <ThemeProvider theme={ theme }>
        <table>
          <tbody>
            <TableRow style={{ color: 'orange', fontSize: '16px' }}>
              <td>
                some text1
                <span>some text2</span>
              </td>
            </TableRow>
          </tbody>
        </table>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
