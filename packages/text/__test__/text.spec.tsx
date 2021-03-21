import { mount, render } from 'enzyme'
import React from 'react'
import Text from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLSpanElement>()
    const wrapper = mount(<Text ref={ref} value="" data-name="yozora-text" />)

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-text')
  })

  it('value is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Text value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }

    expect(render(<Text value="hello" />).text()).toEqual('hello')
  })

  it('className is optional', function () {
    const text = 'Hello, world!'
    expect(render(<Text value={text} />).hasClass('yozora-text')).toEqual(true)

    expect(
      render(<Text value={text} className="my-text" />).hasClass('my-text'),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Text value="Hello, world!" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Text
        value="Hello, world!"
        className="custom-class"
        data-name="yozora-text"
        style={{ color: 'orange' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('children is not allowed', function () {
    const wrapper = render(
      <Text
        value="Hello, world!"
        className="custom-class"
        data-name="yozora-text"
        style={{ color: 'orange' }}
      >
        <em>Children Content will be ignored.</em>
      </Text>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
