import React from 'react'
import { mount, shallow } from 'enzyme'
import { TableCell, TableRow } from '../src'


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
    const wrapper = shallow(
      <table>
        <TableRow>
          <TableCell isHeader={ true }>
            <span>{ text }</span>
          </TableCell>
        </TableRow>
      </table>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list-item'
    const wrapper = shallow(
      <table>
        <TableRow>
          <TableCell isHeader={ false } className={ className }>
            <span>{ text }</span>
          </TableCell>
        </TableRow>
      </table>
    )
    expect(wrapper.find('.' + className) != null).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })

  it('children is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <table>
            <TableRow>
              <TableCell isHeader={ true }>
                { value }
              </TableCell>
            </TableRow>
          </table>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLTableRowElement>()
    const wrapper = mount(
      <table>
        <tbody>
          <TableRow ref={ ref } data-value="waw">
            <TableCell isHeader={ false }>
              1
            </TableCell>
          </TableRow>
        </tbody>
      </table>
    )

    const o = wrapper.find('tr').getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <TableRow style={ { color: 'orange', fontSize: '16px' } }>
            <TableCell isHeader={ false }>
              some text1
              <span>some text2</span>
            </TableCell>
          </TableRow>
        </tbody>
      </table>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
