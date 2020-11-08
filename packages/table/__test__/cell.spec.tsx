import React from 'react'
import { mount, shallow } from 'enzyme'
import { TableCell } from '../src'


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
        <tr>
          <TableCell isHeader={ true }>
            <span>{ text }</span>
          </TableCell>
        </tr>
      </table>
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-list-item'
    const wrapper = shallow(
      <table>
        <tr>
          <TableCell isHeader={ false } className={ className }>
            <span>{ text }</span>
          </TableCell>
        </tr>
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
            <tr>
              <TableCell isHeader={ true }>
                { value }
              </TableCell>
            </tr>
          </table>
        )
      }).toThrow(/Failed prop type: The prop `children` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLTableDataCellElement>()
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell ref={ ref } data-value="waw">
              1
            </TableCell>
          </tr>
        </tbody>
      </table>
    )

    const o = wrapper.find('td').getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell style={ { color: 'orange', fontSize: '16px' } }>
              some text1
              <span>some text2</span>
            </TableCell>
          </tr>
        </tbody>
      </table>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
