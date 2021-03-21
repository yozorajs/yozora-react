import { mount, render } from 'enzyme'
import React from 'react'
import Blockquote from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <Blockquote ref={ref} data-name="yozora-blockquote">
        Blockquote contents.
      </Blockquote>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-blockquote')
  })

  it('children is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Blockquote>{value}</Blockquote>)
      }).toThrow(/The prop `children` is marked as required/i)
    }

    expect(render(<Blockquote>Hello, world!</Blockquote>).text()).toEqual(
      'Hello, world!',
    )
  })

  it('className is optional', function () {
    expect(
      render(<Blockquote>Blockquote contents.</Blockquote>).hasClass(
        'yozora-blockquote',
      ),
    ).toEqual(true)

    expect(
      render(
        <Blockquote className="my-blockquote">Blockquote contents.</Blockquote>,
      ).hasClass('my-blockquote'),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(
      <Blockquote>
        some text1
        <span>some text2</span>
      </Blockquote>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Blockquote
        className="custom-class"
        data-name="yozora-blockquote"
        style={{ color: 'orange' }}
      >
        some text1
        <span>some text2</span>
        <Blockquote>some text3</Blockquote>
      </Blockquote>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
