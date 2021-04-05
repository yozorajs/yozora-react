import { mount, render } from 'enzyme'
import React from 'react'
import InlineCode from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(
      <InlineCode ref={ref} data-name="yozora-inline-code" value="" />,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-inline-code')
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<InlineCode value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  it('className is optional', function () {
    expect(
      render(<InlineCode value="" />).hasClass('yozora-inline-code'),
    ).toEqual(true)

    expect(
      render(<InlineCode className="my-inline-code" value="" />).hasClass(
        'my-inline-code',
      ),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = render(
      <InlineCode
        value="Hello, world!"
        style={{ color: 'orange', fontSize: '16px' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', () => {
    const wrapper = render(
      <InlineCode
        value="Hello, world!"
        className="custom-class"
        style={{ color: 'orange' }}
        data-name="yozora-inline-code"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
