import { mount, render } from 'enzyme'
import React from 'react'
import Delete from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <Delete ref={ref} data-name="yozora-delete">
        Deleted contents.
      </Delete>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-delete')
  })

  it('children is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Delete>{value}</Delete>)
      }).toThrow(/The prop `children` is marked as required/i)
    }

    expect(render(<Delete>Hello, world!</Delete>).text()).toEqual(
      'Hello, world!',
    )
  })

  it('className is optional', function () {
    expect(
      render(<Delete>Deleted contents.</Delete>).hasClass('yozora-delete'),
    ).toEqual(true)

    expect(
      render(<Delete className="my-delete">Deleted contents.</Delete>).hasClass(
        'my-delete',
      ),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(
      <Delete>
        some text1
        <span>some text2</span>
      </Delete>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Delete
        className="custom-class"
        data-name="yozora-delete"
        style={{ color: 'orange' }}
      >
        some text1
        <span>some text2</span>
      </Delete>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
