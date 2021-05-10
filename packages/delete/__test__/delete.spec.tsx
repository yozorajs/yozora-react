import { render } from 'enzyme'
import React from 'react'
import Delete from '../src'

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
      expect(() => {
        render(<Delete>{value}</Delete>)
      }).not.toThrow()
    }

    expect(render(<Delete>Hello, world!</Delete>).text()).toEqual(
      'Hello, world!',
    )
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Delete>{children}</Delete>)
      expect(node.hasClass('yozora-delete')).toEqual(true)
    })

    it('custom', function () {
      const node = render(<Delete className="my-delete">{children}</Delete>)
      expect(node.hasClass('yozora-delete')).toEqual(true)
      expect(node.hasClass('my-delete')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(<Delete style={{ color: 'orange' }}>{children}</Delete>)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Delete>{children}</Delete>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Delete className="custom-class" style={{ color: 'orange' }}>
        {children}
      </Delete>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
