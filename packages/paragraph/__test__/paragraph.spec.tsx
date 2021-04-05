import { mount, render } from 'enzyme'
import React from 'react'
import Paragraph from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', function () {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <Paragraph ref={ref} data-name="yozora-paragraph">
        Paragraph contents.
      </Paragraph>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-paragraph')
  })

  it('children is optional', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Paragraph>{value}</Paragraph>)
      }).not.toThrow()
    }

    expect(render(<Paragraph>Hello, world!</Paragraph>).text()).toEqual(
      'Hello, world!',
    )
  })

  it('className is optional', function () {
    expect(
      render(<Paragraph>Paragraph contents.</Paragraph>).hasClass(
        'yozora-paragraph',
      ),
    ).toEqual(true)

    expect(
      render(
        <Paragraph className="my-paragraph">Paragraph contents.</Paragraph>,
      ).hasClass('my-paragraph'),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(
      <Paragraph>
        some text1
        <span>some text2</span>
      </Paragraph>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Paragraph
        className="custom-class"
        data-name="yozora-paragraph"
        style={{ color: 'orange' }}
      >
        some text1
        <span>some text2</span>
        <Paragraph>some text3</Paragraph>
      </Paragraph>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
