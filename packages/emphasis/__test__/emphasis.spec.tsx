import { render } from 'enzyme'
import React from 'react'
import Emphasis from '../src'

const children = (
  <React.Fragment>
    some text1
    <span>some text2</span>
  </React.Fragment>
)

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('children is optional', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => render(<Emphasis>{value}</Emphasis>)).not.toThrow()
    }

    expect(render(<Emphasis>Hello, world!</Emphasis>).text()).toEqual(
      'Hello, world!',
    )
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Emphasis>{children}</Emphasis>)
      expect(node.hasClass('yozora-emphasis')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <Emphasis className="my-emphasis">{children}</Emphasis>,
      )
      expect(node.hasClass('yozora-emphasis')).toBeTruthy()
      expect(node.hasClass('my-emphasis')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <Emphasis style={{ color: 'orange' }}>{children}</Emphasis>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Emphasis>{children}</Emphasis>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Emphasis className="custom-class" style={{ color: 'orange' }}>
        {children}
      </Emphasis>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
