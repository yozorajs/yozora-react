import React from 'react'
import { mount, render } from 'enzyme'
import { Table, TableCell, TableRow } from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  const HeadRow = () => (
    <TableRow>
      <TableCell isHeader={ true }>Name</TableCell>
    </TableRow>
  )

  const BodyRows = () => (
    <React.Fragment>
      <TableRow>
        <TableCell isHeader={ false }>Alice</TableCell>
      </TableRow>
      <TableRow>
        <TableCell isHeader={ false }>Bob</TableCell>
      </TableRow>
    </React.Fragment>
  )

  it('render with custom className', () => {
    const className = 'custom-list-item'
    const wrapper = render(
      <Table
        className={ className }
        head={ <HeadRow /> }
        body={ <BodyRows /> }
        data-value="waw"
      />
    )
    expect(wrapper.find('.' + className) != null).toEqual(true)
    expect(wrapper.text()).toEqual('NameAliceBob')
  })

  it('head is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        mount(
          <Table
            head={ value }
            body={ <BodyRows /> }
          />
        )
      }).toThrow(/Failed prop type: The prop `head` is marked as required/)
    }
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLTableElement>()
    const wrapper = mount(
      <Table
        ref={ ref }
        head={ <HeadRow /> }
        body={ <BodyRows /> }
        data-value="waw"
      />
    )


    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <Table
        head={ <HeadRow /> }
        body={ <BodyRows /> }
        style={ { color: 'orange', fontSize: '16px' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
