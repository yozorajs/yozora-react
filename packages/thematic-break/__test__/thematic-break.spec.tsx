import { mount, render } from 'enzyme'
import React from 'react'
import ThematicBreak from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <ThematicBreak ref={ref} data-name="yozora-thematic-break" />,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-thematic-break')
  })

  it('className is optional', function () {
    expect(render(<ThematicBreak />).hasClass('yozora-thematic-break')).toEqual(
      true,
    )

    expect(
      render(<ThematicBreak className="my-thematic-break" />).hasClass(
        'my-thematic-break',
      ),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<ThematicBreak />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <ThematicBreak
        className="custom-class"
        data-name="yozora-thematic-break"
        style={{ color: 'orange' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('children is not allowed', function () {
    const wrapper = render(
      <ThematicBreak
        className="custom-class"
        data-name="yozora-thematic-break"
        style={{ color: 'orange' }}
      >
        <em>Children Content will be ignored.</em>
      </ThematicBreak>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
