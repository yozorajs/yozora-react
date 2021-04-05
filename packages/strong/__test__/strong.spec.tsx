import { mount, render } from 'enzyme'
import React from 'react'
import Strong from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <Strong ref={ref} data-name="yozora-strong">
        Strong contents.
      </Strong>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-strong')
  })

  it('children is optional', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Strong>{value}</Strong>)
      }).not.toThrow()
    }

    expect(render(<Strong>Hello, world!</Strong>).text()).toEqual(
      'Hello, world!',
    )
  })

  it('className is optional', function () {
    expect(
      render(<Strong>Strong contents.</Strong>).hasClass('yozora-strong'),
    ).toEqual(true)

    expect(
      render(<Strong className="my-strong">Strong contents.</Strong>).hasClass(
        'my-strong',
      ),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(
      <Strong>
        some text1
        <span>some text2</span>
      </Strong>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Strong
        className="custom-class"
        data-name="yozora-strong"
        style={{ color: 'orange' }}
      >
        some text1
        <span>some text2</span>
      </Strong>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
