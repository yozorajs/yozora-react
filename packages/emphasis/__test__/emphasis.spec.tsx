import { mount, render } from 'enzyme'
import React from 'react'
import Emphasis from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <Emphasis ref={ref} data-name="yozora-emphasis">
        Emphasis contents.
      </Emphasis>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-emphasis')
  })

  it('children is optional', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => render(<Emphasis>{value}</Emphasis>)).not.toThrow()
    }

    expect(render(<Emphasis>Hello, world!</Emphasis>).text()).toEqual(
      'Hello, world!',
    )
  })

  it('className is optional', function () {
    expect(
      render(<Emphasis>Emphasis contents.</Emphasis>).hasClass(
        'yozora-emphasis',
      ),
    ).toEqual(true)

    expect(
      render(
        <Emphasis className="my-emphasis">Emphasis contents.</Emphasis>,
      ).hasClass('my-emphasis'),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(
      <Emphasis>
        some text1
        <span>some text2</span>
      </Emphasis>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Emphasis
        className="custom-class"
        data-name="yozora-emphasis"
        style={{ color: 'orange' }}
      >
        some text1
        <span>some text2</span>
      </Emphasis>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
